if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;

const db = require('./models/db');

app.get('/', (req, res) => {
  res.send('HELLO WORLD!!');
});
// Allows to send out responses from requests from unidentified origins
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


async function InitDB() {
  await db.recipeHelpers.init();
}

app.get('/recipes', async (req, res) => {
  try{
    const recipes = await db.recipeHelpers.getAllRecipes();
    res.json(recipes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error ocurred while getting all the recipes' });
  }
});

app.get('/recipes/:recipe_id', async (req, res) => {
  try {
    const recipe_id = req.params.recipe_id;
    const recipe = await db.recipeHelpers.getRecipeById(recipe_id);
    const ingredients = await db.recipeIngredientHelpers.getRecipeIngredients(recipe_id);
    const recipeInfo = { recipe: recipe[0], ingredients };
    res.json(recipeInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `An error ocurred while getting the recipe with recipe_id ${recipe_id}` });
  }
});

app.get('/recipes/latest/:numberOfRecipes', async (req, res) => {
  try {
    const numberOfRecipes = req.params.numberOfRecipes;
    const recipes = await db.recipeHelpers.getLatestRecipes(numberOfRecipes);
    res.json(recipes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error ocurred while getting the latest recipes' });
  }
})

app.post('/recipes/add', async (req, res) => {
  try {
    const name = req.body.name;
    const prep_time = req.body.prep_time;
    const cook_time = req.body.cook_time;
    const description = req.body.description;
    const procedure = req.body.procedure;
    const last_modified = req.body.last_modified;
    const newRecipe = await db.recipeHelpers.createRecipe(name, prep_time, cook_time, description, procedure, last_modified);
    res.json(newRecipe);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error ocurred while adding the recipe' });
  }
})

app.put('/recipes/edit/:recipe_id', async (req, res) => {
  try {
    const recipe_id = req.params.recipe_id;
    const name = req.body.name;
    const prep_time = req.body.prep_time;
    const cook_time = req.body.cook_time;
    const description = req.body.description;
    const procedure = req.body.procedure;
    const last_modified = req.body.last_modified;
    const newRecipe = await db.recipeHelpers.updateRecipeById(recipe_id, name, prep_time, cook_time, description, procedure, last_modified);
    res.json(newRecipe);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error ocurred while updating the recipe' });
  }
})

app.delete('/recipes/delete/:recipe_id', async (req, res) => {
  try {
    const recipe_id = req.params.recipe_id;
    const deletedRecipe = await db.recipeHelpers.deleteRecipeById(recipe_id);
    console.log(recipe_id);
    res.json(deletedRecipe);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error ocurred while deleting the recipe' });
  }
})

app.post('/ingredients/add', async (req, res) => {
  try {
    const name = req.body.name;
    const newIngredient = await db.ingredientHelpers.createIngredient(name);
    res.json(newIngredient);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error ocurred while adding the ingredient' });
  }
})

// Receives an arroy of ingredients and adds them to the database
app.post('/ingredients/add-multiple', async (req, res) => {
  try {
    const ingredients = req.body.ingredients;
    const newIngredients = await db.ingredientHelpers.createIngredients(ingredients);
    res.json(newIngredients);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error ocurred while adding the ingredients' });
  }
})

// Receives an array of ingredients and adds it to the recipe
app.post('/recipe_ingredients/add-multiple', async (req, res) => {
  try {
    const recipe_ingredients = req.body.recipe_ingredients;
    const recipe_id = req.body.recipe_id;
    const newRecipeIngredients = await db.recipeIngredientHelpers.createRecipeIngredients(recipe_ingredients, recipe_id);
    res.json(newRecipeIngredients);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error ocurred while adding the recipe_ingredients' });
  }
})

app.delete('/recipe_ingredients/delete/:recipe_ingredient_id', async (req, res) => {
  try {
    const recipe_ingredient_id = req.params.recipe_ingredient_id;
    const deletedRecipeIngredients = await db.recipeIngredientHelpers.deleteRecipeIngredient(recipe_ingredient_id);
    res.json(deletedRecipeIngredients);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error ocurred while deleting the recipe_ingredients' });
  }
})


InitDB()
  .then(() => {
    app.listen(port, console.log(`Listening on port ${port} WAZAA`));
  })
  .catch((err) => { console.log(err)})

