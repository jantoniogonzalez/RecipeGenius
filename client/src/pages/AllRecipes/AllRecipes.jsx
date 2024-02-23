import React, { useState, useEffect } from "react";
import './style.css';
import NavBar from "../../components/NavBar/NavBar";
import Card from "../../components/Card/Card";
import axios from 'axios';

function AllRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    let didCancel = false;
    async function getAllRecipes() {
      try {
        const response = await axios.get('http://localhost:3000/recipes');
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

  return (
    <div className="all-recipes">
      <h2>All Recipes</h2>
      <div className="cards-container">
        
        <Card />
      </div>
    </div>
  );
}

export default AllRecipes;