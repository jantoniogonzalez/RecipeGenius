import React, { useEffect, useState } from 'react';
// Icons
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Styles
import breakfast from '../../images/food-bowl.jpg';
import './style.css';

function Card({ recipe }) {
  const [recipeId, setRecipeId] = useState(null);
  const [recipeName, setRecipeName] = useState(null);
  const [recipeDuration, setRecipeDuration] = useState(null);

  useEffect(() => {
    let didCancel = false;

    if (!recipe) return;

    if (!didCancel) {
      setRecipeId(recipe.id);
      setRecipeName(recipe.name);
      setRecipeDuration(recipe.duration);
    }

    return () => { return didCancel = true; };
  }, [recipe]);


  return(
    <div className="card">
      <div className="card-content">
        <img className="card-image" src={breakfast} alt="food" />
        <div className="bottom-text">
          <h3>Breakfast</h3>
          <div className="actions">
            <div className="time">
              <TimerOutlinedIcon fontSize="medium" />
              <p>60'</p>
            </div>
            <div className="buttons">
              <button className="edit"><EditIcon fontSize='small' /></button>
              <button className="delete"><DeleteIcon fontSize='small' /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card;