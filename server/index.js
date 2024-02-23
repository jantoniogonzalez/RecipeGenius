if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

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
  try{
    const recipes = await db.helpers.getAllRecipes();
    res.json(recipes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error ocurred while getting all the recipes' });
  }
});

app.get('/recipes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const recipe = await db.helpers.getRecipeById(id);
    res.json(recipe);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `An error ocurred while getting the recipe with id ${id}` });
  }
});

app.get('/recipes/latest/:numberOfRecipes', async (req, res) => {
  try {
    const numberOfRecipes = req.params.numberOfRecipes;
    const recipes = await db.helpers.getLatestRecipes(numberOfRecipes);
    res.json(recipes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error ocurred while getting the latest recipes' });
  }
})

app.post('/recipes/add', async (req, res) => {
  try {
    const name = req.body.name;
    const duration = req.body.duration;
    const description = req.body.description;
    const procedure = req.body.procedure;
    const last_modified = req.body.last_modified;
    const newRecipe = await db.helpers.createRecipe(name, duration, description, procedure, last_modified);
    res.json(newRecipe);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error ocurred while adding the recipe' });
  }
})

app.put('/recipes/edit/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const duration = req.body.duration;
    const description = req.body.description;
    const procedure = req.body.procedure;
    const last_modified = req.body.last_modified;
    const newRecipe = await db.helpers.updateRecipeById(id, name, duration, description, procedure, last_modified);
    res.json(newRecipe);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error ocurred while updating the recipe' });
  }
})

app.delete('/recipes/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedRecipe = await db.helpers.deleteRecipeById(id);
    res.json(deletedRecipe);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error ocurred while deleting the recipe' });
  }
})

InitDB()
  .then(() => {
    app.listen(port, console.log(`Listening on port ${port} WAZAA`));
  })
  .catch((err) => { console.log(err)})

