const { Pool } = require('pg');

var pool = new Pool({
  connectionString: 'postgres://postgres:root@localhost:5432/recipegeniusdb'
})

const helpers = {
  init: async function() {
    const q = 'CREATE TABLE IF NOT EXISTS recipes(id SERIAL PRIMARY KEY, name varchar[50], duration integer, description varchar[256], procedure varchar, last_modified timestamp);';
    const res = await pool.query(q);
  },
  getAllRecipes: async function() {
    const q = 'SELECT * FROM recipes;';
    const res = await pool.query(q);
    return res.rows;
  },
  getRecipeById: async function(id) {
    const q = 'SELECT * FROM recipes WHERE id = $1 LIMIT 1;';
    const res = await pool.query(q, [id]);
    return res.rows;
  },
  getLatestRecipes: async function(numberOfRecipes) {
    const q = 'SELECT * FROM recipes ORDER BY last_modified DESC LIMIT $1;'
    const res = await pool.query(q, [numberOfRecipes]);
    return res.rows;
  },
  createRecipe: async function(name, duration, description, procedure, last_modified) {
    const q = 'INSERT INTO recipes (name, duration, description, procedure, last_modified) VALUES ($1, $2, $3, $4, $5);';
    const res = await pool.query(q, [name, duration, description, procedure, last_modified]);
    return res.rows;
  },
  updateRecipeById: async function(id, name, duration, description, procedure, last_modified) {
    const q = 'UPDATE recipes WHERE id = $1 SET (name, duration, description, procedure, last_modified) VALUES ($2, $3, $4, $5, $6);';
    const res = await pool.query(q, [id, name, duration, description, procedure, last_modified]);
    return res.rows;
  },
  deleteRecipeById: async function(id) {
    const q = 'DELETE FROM recipes WHERE id = $1';
    const res = await pool.query(q, [id]);
    return res.rows;
  }
}

module.exports = {helpers}