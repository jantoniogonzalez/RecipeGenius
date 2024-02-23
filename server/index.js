import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

const db = require('./models/db');

app.get('/', (req, res) => {
  res.send('HELLO WORLD!!');
});
// Allows to send out responses from requests from unidentified origins
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


async function InitDB() {
  await db.helpers.init();
}

app.get('/recipes', async (req, res) => {
  const recipes = await db.helpers.getAllRecipes();
  res.json(recipes);
});

app.get('/recipes/:id', async (req, res) => {
  const id = req.params.id;
  const recipe = await db.helpers.getRecipeById(id);
  res.json(recipe);
});

app.get('/recipes/latest/:numberOfRecipes', async (req, res) => {
  const numberOfRecipes = req.params.numberOfRecipes;
  const recipes = await db.helpers.getLatestRecipes(numberOfRecipes);
  res.json(recipes);
})

app.post('/recipes/add', async (req, res) => {
  const name = req.body.name;
  const duration = req.body.duration;
  const description = req.body.description;
  const procedure = req.body.procedure;
  const last_modified = req.body.last_modified;
  const newRecipe = await db.helpers.createRecipe(name, duration, description, procedure, last_modified);
  res.json(newRecipe);
})

app.put('/recipes/edit/:id', async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const duration = req.body.duration;
  const description = req.body.description;
  const procedure = req.body.procedure;
  const last_modified = req.body.last_modified;
  const newRecipe = await db.helpers.updateRecipeById(id, name, duration, description, procedure, last_modified);
  res.json(newRecipe);
})

app.delete('recipe/delete/:id', async (req, res) => {
  const id = req.params.id;
  const deletedRecipe = await db.helpers.deleteRecipeById(id);
  res.json(deletedRecipe);
})

InitDB()
  .then(() => {
    app.listen(port, console.log(`Listening on port ${port} WAZAA`));
  })
  .catch((err) => { console.log(err)})

