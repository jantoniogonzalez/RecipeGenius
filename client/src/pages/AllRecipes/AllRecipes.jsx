import React, { useState, useEffect } from "react";
import './style.css';
import NavBar from "../../components/NavBar/NavBar";
import Card from "../../components/Card/Card";
import axios from 'axios';
import meme from '../../images/recipe_meme.svg';
import { Link } from "react-router-dom";

function AllRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    let didCancel = false;
    async function getAllRecipes() {
      try {
        const response = await axios.get(`http://localhost:3000/recipes`);
        const recipes = response.data;
        console.log(recipes);
        if (!didCancel) setRecipes(recipes);
      } catch (err) {
        console.log(err);
      }
    }
    getAllRecipes();
    return () => { return didCancel = true; }
  }, []);

  function deleteRecipe(index) {
    const newRecipes = [...recipes];
    newRecipes.splice(index, 1);
    setRecipes(newRecipes);
  }

  return (
    <div>
      <NavBar />
      <div className="all-recipes">
        <h2>All Recipes</h2>
        <div className="cards-container">
          {recipes && recipes.map((recipe, key) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <Card key={key} recipe={recipe} onDelete={() => deleteRecipe(key)} />
            )
          })}
        </div>
        {(!recipes || recipes.length === 0 ) && (
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '2rem 0rem', border: '1px dashed gray', borderRadius: '20px'}}>
            <img src={meme} alt="recipe meme" style={{maxHeight: '400px', marginBottom: '1rem'}} />
            <Link to='/recipe/add'>
              <button>New Recipe</button>
            </Link>
            
          </div>
        )}
      </div>
    </div>
  );
}

export default AllRecipes;