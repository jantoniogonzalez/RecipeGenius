import React, { useState, useEffect } from 'react'
import NavBar from '../../components/NavBar/NavBar';
import { useParams, useNavigate } from 'react-router-dom';
import foodImage from '../../images/food-bowl.jpg';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import './style.css';

function ViewRecipe() {
  const {recipe_id} = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    name: 'Food Name',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pulvinar eget enim vitae sollicitudin. Proin sodales diam eu est cursus ultrices. Suspendisse quis mauris accumsan est dapibus fringilla. Phasellus neque massa, hendrerit quis enim eu cras amet.',
    procedure: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'],
    cook_time: 0,
    prep_time: 0,
  });
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    if (!recipe_id) return;
    console.log( `Fetching recipe with id ${recipe_id}`);
    async function getRecipe() {
      try {
        const recipeInfo = await axios.get(`http://localhost:8080/recipes/${recipe_id}`);
        const recipe = recipeInfo.data.recipe;
        const ingredients = recipeInfo.data.ingredients;
        setIngredients(ingredients);
        setRecipe(recipe);
        console.log(recipeInfo);
      } catch(err) {
        navigate('/not-found');
        console.log(err);
      }
    }

    getRecipe();
  }, [recipe_id])

  async function deleteRecipe() {
    try {
      const response = await axios.delete(`http://localhost:8080/recipes/delete/${recipe_id}`);
      console.log(`Recipe deleted: ${response.data}`);
      navigate('/recipes');
    } catch (err) {
      console.log(err);
      navigate('/not-found');
    }
  }

  return (
    <div>
      <NavBar />
      <div className="view-recipe">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
          <h2>{recipe.name}</h2>
          <div style={{ display: 'flex', gap: '1rem'}}>
            <button className="edit-button" onClick={() => navigate(`/recipe/edit/${recipe_id}`)}><EditIcon /></button>
            <button className="delete-button" onClick={() => deleteRecipe()}><DeleteIcon /></button>
          </div>
        </div>
        <div className="first-row">
          <img src={foodImage} alt="Food Image" id="food-image" />
          <div className="right-column">
            <div className="times">
              <div>
                <label>Prep Time 🥣</label>
                <p>{recipe.prep_time} minutes</p>
              </div>
              <div>
                <label>Cook Time 🥘</label>
                <p>{recipe.cook_time} minutes</p>
              </div>
            </div>
            <div>
              <label>Description 📖</label>
              <p>{recipe.description}</p>
            </div>
          </div>
        </div>
        <div>
          <label>Ingredients:</label>
          <ul>
            {ingredients.map((ingredient, index) => {
              return (
                <li key={index}>{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>
              )
            })}
          </ul>
        </div>
        <div>
          <label>Procedure:</label>
          <ol>
            {recipe.procedure.map((step, index) => {
              return (
                <li key={index}>{step}</li>
              )
            })}
          </ol>
        </div>
      </div>
    </div>
  )
}

export default ViewRecipe;