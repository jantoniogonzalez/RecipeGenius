import React from "react";
import './style.css';
import NavBar from "../../components/NavBar/NavBar";
import Card from "../../components/Card/Card";

function AllRecipes() {
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