import React, { useState, useEffect } from 'react';
import Chip from '../../components/Chip/Chip';
import './style.css';

function AddRecipe() {
  const [recipeName, setRecipeName] = useState(null);
  const [description, setDescription] = useState(null);
  const [steps, setSteps] = useState([]);
  const [cookTime, setCookTime] = useState(0);
  const [prepTime, setPrepTime] = useState(0);
  const [ingredients, setIngredients] = useState([]);

  return (
    <div className="add-recipe">
      <h1>New Recipe</h1>
      <div className="first-row">
        <div style={{ width: '200px', height: '200px', backgroundColor: 'grey' }}>
          Input Image
        </div>
        <div className="first-fields">
          <div className="field">
            <label>Name of your masterpiece?</label>
            <input type="text" value={recipeName} onBlur={(e) => setRecipeName(e.value)} />
          </div>
          <div className="field">
            <label>Time is relative anyways...</label>
            <div>
              <input type="number" /><span>minutes</span>
            </div>
          </div>
          <div className="field">
            <label>Can you describe this delicacy for me?</label>
            <textarea value={description} onBlur={(e) => setDescription(e.value)} />
          </div>
        </div>
      </div>
      <div>
        <div className="field">
          <label>What ingredients will we need?</label>
          <input type="text"  />
        </div>
        <div>
          <p>100g of Examples</p>
        </div>
      </div>
      <div className="field">
        <label>Let's cook! Wait... what are the steps?</label>
        <textarea />
      </div>
    </div>
  );
}

export default AddRecipe;