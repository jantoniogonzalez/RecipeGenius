import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Icons
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Styles
import breakfast from '../../images/food-bowl.jpg';
import './style.css';

function Card({ recipe, onDelete }) {
  const [recipeId, setRecipeId] = useState(null);
  const [recipeName, setRecipeName] = useState(null);
  const [recipeDuration, setRecipeDuration] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let didCancel = false;

    if (!recipe) return;

    if (!didCancel) {
      setRecipeId(recipe.recipe_id);
      setRecipeName(recipe.name);
      setRecipeDuration(recipe.cook_time + recipe.prep_time);
    }

    return () => { return didCancel = true; };
  }, [recipe]);

  function editRecipe(e) {
    e.stopPropagation();
    console.log('EDIT RECIPE');
    navigate(`/recipe/edit/${recipeId}`)
  }

  async function deleteRecipe(e) {
    e.stopPropagation();
    try{
      const response = await axios.delete(`http://localhost:3000/recipes/delete/${recipeId}`);
      onDelete();
      console.log(`Recipe deleted: ${response.data}`);
    } catch (err) {
      console.log(err);
    }
  }

  return(
    <div className="card" onClick={() => navigate(`/recipe/${recipeId}`)}>
      <div className="card-content">
        <img className="card-image" src={breakfast} alt="food" />
        <div className="bottom-text">
          <h3>{recipeName}</h3>
          <div className="actions">
            <div className="time">
              <TimerOutlinedIcon fontSize="medium" />
              <p>{recipeDuration}</p>
            </div>
            <div className="buttons">
              <button className="edit" onClick={(e) => editRecipe(e)}><EditIcon fontSize='small' /></button>
              <button className="delete" onClick={(e) => deleteRecipe(e)}><DeleteIcon fontSize='small' /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card;