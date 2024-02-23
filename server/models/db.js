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

const helpers = {
  init: async function() {
    const q = 'CREATE TABLE IF NOT EXISTS recipes(id SERIAL PRIMARY KEY, name varchar(255), duration integer, description varchar(255), procedure text, last_modified timestamp);';
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
    const q = 'UPDATE recipes SET name = $1, duration = $2, description = $3, procedure = $4, last_modified = $5 WHERE id = $6 RETURNING *;';
    const res = await pool.query(q, [name, duration, description, procedure, last_modified, id]);
    return res.rows;
  },
  deleteRecipeById: async function(id) {
    const q = 'DELETE FROM recipes WHERE id = $1';
    const res = await pool.query(q, [id]);
    return res.rows;
  }
}

module.exports = {helpers}