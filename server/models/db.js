if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const { Pool } = require('pg');

var pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT, // default Postgres port
  database: process.env.PGDATABASE
})

const ingredientHelpers = {
  // Return an array with all ingredients
  getAllIngredients: async function() {
    const q = 'SELECT * FROM ingredients;';
    const res = await pool.query(q);
    return res.rows;
  },
  // Returns an ingredient with a specific id
  getIngredientById: async function(id) {
    const q = 'SELECT * FROM ingredients WHERE id = $1 LIMIT 1;';
    const res = await pool.query(q, [id]);
    return res.rows;
  },
  // Returns an array with 1 ingredient with a specific name, use to check if an ingredient already exists
  getIngredientByName: async function(name) {
    const q = 'SELECT * FROM ingredients WHERE name = $1 LIMIT 1;';
    const res = await pool.query(q, [name]);
    if (!res?.rows) return [];
    return res.rows;
  },
  // Returns an array of ingredients containing a specific name
  getIngredientsWithName: async function(name) {
    const q = 'SELECT * FROM ingredients WHERE name LIKE $1;';
    const res = await pool.query(q, [name]);
    return res.rows;
  },
  // Create a new ingredient, if it doesn't exist
  createIngredient: async function(name) {
    const ingredient = await this.getIngredientByName(name);
    if (ingredient && ingredient.length > 0) return ingredient;
    const q = 'INSERT INTO ingredients (name) VALUES ($1) RETURNING *;';
    const res = await pool.query(q, [name]);
    return res.rows;
  },
  // Create multiple ingredients, if they don't exist
  createIngredients: async function(ingredients) {
    let valueString = '';
    for (let i = 0; i < ingredients.length; i++) {
      const ingredient = ingredients[i];
      const name = ingredient.name;
      if (i < ingredients.length - 1) valueString += `('${name}'), `;
      else valueString += `('${name}')`;
    }
    const q = `INSERT INTO ingredients (name) VALUES ${valueString} RETURNING *;`;
    const res = await pool.query(q);
    return res.rows;
  },
  // Update an ingredient with a specific id
  updateIngredientById: async function(id, name) {
    const q = 'UPDATE ingredients SET name = $1 WHERE id = $2 RETURNING *;';
    const res = await pool.query(q, [name, id]);
    return res.rows;
  },
  // Delete an ingredient with a specific id
  deleteIngredientById: async function(id) {
    const q = 'DELETE FROM ingredients WHERE id = $1;';
    const res = await pool.query(q, [id]);
    return res.rows;
  },
}
 
const recipeIngredientHelpers = {
  // Gets all the ingredients for a specific recipe
  getRecipeIngredients: async function(recipe_id) {
    const q = 'SELECT * FROM recipe_ingredients t1 INNER JOIN ingredients t2 ON t1.recipe_id = $1 AND t1.ingredient_id = t2.ingredient_id;';
    const res = await pool.query(q, [recipe_id]);
    return res.rows
  },
  // Gets all the recipes that contain a specific ingredient
  getRecipesByIngredient: async function(ingredient_id) {
    const q = 'SELECT * FROM recipes t1 INNER JOIN recipe_ingredients t2 ON t2.ingredient_id = $1 AND t1.recipe_id = t2.recipe_id;';
    const res = await pool.query(q, [ingredient_id]);
    return res.rows;
  },
  // Adds a new ingredient to a recipe, needs to be called after creating an ingredient
  createRecipeIngredient: async function(ingredient_id, quantity, unit, recipe_id) {
    const q = 'INSERT INTO recipe_ingredients (ingredient_id, quantity, unit, recipe_id) VALUES ($1, $2, $3, $4);';
    const res = await pool.query(q, [ingredient_id, quantity, unit, recipe_id]);
    return res.rows;
  },
  // Adds multiple ingredients to a recipe, needs to be called after creating the ingredients for the recipe
  createRecipeIngredients: async function(ingredients, recipe_id) {
    let valueString = '';
    for (let i = 0; i < ingredients.length; i++) {
      const ingredient = ingredients[i];
      const ingredient_id = ingredient.ingredient_id;
      const quantity = ingredient.quantity;
      const unit = ingredient.unit;
      if (i < ingredients.length - 1) valueString += `(${ingredient_id}, ${quantity}, '${unit}', ${recipe_id}), `;
      else valueString += `(${ingredient_id}, ${quantity}, '${unit}', ${recipe_id})`;
    }
    const q = `INSERT INTO recipe_ingredients (ingredient_id, quantity, unit, recipe_id) VALUES ${valueString} RETURNING *;`;
    const res = await pool.query(q);
    return res.rows;
  },
  deleteRecipeIngredient: async function(recipe_ingredient_id) {
    const q = 'DELETE FROM recipe_ingredients WHERE recipe_ingredient_id = $1 RETURNING *;';
    const res = await pool.query(q, [recipe_ingredient_id]);
  },
}

const recipeHelpers = {
  init: async function() {
    const q = 'CREATE TABLE IF NOT EXISTS recipes(recipe_id SERIAL PRIMARY KEY, name varchar(255), prep_time integer, cook_time integer, description varchar(255), procedure text[], last_modified timestamp);';
    const q2 = 'CREATE TABLE IF NOT EXISTS ingredients(ingredient_id SERIAL PRIMARY KEY, name varchar(255));';
    const q3 = 'CREATE TABLE IF NOT EXISTS recipe_ingredients(recipe_ingredient_id SERIAL PRIMARY KEY, ingredient_id integer, quantity integer, unit varchar(255), recipe_id integer, CONSTRAINT fk_recipe FOREIGN KEY(recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE, CONSTRAINT fk_ingredient FOREIGN KEY(ingredient_id) REFERENCES ingredients(ingredient_id) ON DELETE SET NULL);';
    await pool.query(q);
    await pool.query(q2);
    await pool.query(q3);
  },
  getAllRecipes: async function() {
    const q = 'SELECT * FROM recipes;';
    const res = await pool.query(q);
    return res.rows;
  },
  getRecipeById: async function(recipe_id) {
    const q = 'SELECT * FROM recipes WHERE recipe_id = $1 LIMIT 1;';
    const res = await pool.query(q, [recipe_id]);
    return res.rows;
  },
  getLatestRecipes: async function(numberOfRecipes) {
    const q = 'SELECT * FROM recipes ORDER BY last_modified DESC LIMIT $1;'
    const res = await pool.query(q, [numberOfRecipes]);
    return res.rows;
  },
  createRecipe: async function(name, prep_time, cook_time, description, procedure, last_modified) {
    const q = 'INSERT INTO recipes (name, prep_time, cook_time, description, procedure, last_modified) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;';
    const res = await pool.query(q, [name, prep_time, cook_time, description, procedure, last_modified]);
    return res.rows;
  },
  updateRecipeById: async function(recipe_id, name, prep_time, cook_time, description, procedure, last_modified) {
    const q = 'UPDATE recipes SET name = $1, prep_time = $2, cook_time = $3, description = $4, procedure = $5, last_modified = $6 WHERE recipe_id = $7 RETURNING *;';
    const res = await pool.query(q, [name, prep_time, cook_time, description, procedure, last_modified, recipe_id]);
    return res.rows;
  },
  deleteRecipeById: async function(recipe_id) {
    const q = 'DELETE FROM recipes WHERE recipe_id = $1;';
    const res = await pool.query(q, [recipe_id]);
    return res.rows;
  },
}

module.exports = {recipeHelpers, ingredientHelpers, recipeIngredientHelpers}