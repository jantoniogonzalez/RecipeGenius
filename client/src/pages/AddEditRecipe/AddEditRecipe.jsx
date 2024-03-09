import React, { useState, useEffect } from 'react';
import Chip from '../../components/Chip/Chip';
import AddIcon from '@mui/icons-material/Add';
import NavBar from '../../components/NavBar/NavBar';
import './style.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AddEditRecipe() {
  const {recipe_id} = useParams();
  console.log(recipe_id);
  const [recipeName, setRecipeName] = useState(null);
  const [description, setDescription] = useState(null);
  const [procedure, setProcedure] = useState([]);
  const [cookTime, setCookTime] = useState(null);
  const [prepTime, setPrepTime] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState({
    quantity: null,
    unit: 'unit',
    name: null
  });
  const [currentStep, setCurrentStep] = useState(null);

  useEffect(() => {
    if (!recipe_id) return;
    console.log( `Fetching recipe with id ${recipe_id}`);
    async function getRecipe() {
      try {
        const recipeInfo = await axios.get(`http://localhost:3000/recipes/${recipe_id}`);
        console.log(recipeInfo);
      } catch(err) {
        console.log(err);
      }
      
    }

    getRecipe();
  }, []);

  function addIngredient() {
    setIngredients([...ingredients, currentIngredient]);
    setCurrentIngredient({
      quantity: '',
      unit: 'unit',
      name: ''
    });
    console.log('adding ingredient')
  }

  function addStep() {
    setProcedure([...procedure, currentStep]);
    setCurrentStep('');
    console.log('adding step')
  }

  function editCurrentIngredient(value, key) {
    setCurrentIngredient({ ...currentIngredient, [key]: value });
    console.log(`updating ${key} to ${value}`)
  }

  function deleteIngredient(index) {
    const newIngredients = ingredients.filter((ingredient, i) => i !== index);
    setIngredients(newIngredients);
  }

  function deleteStep(index) {
    const newSteps = procedure.filter((step, i) => i !== index);
    setProcedure(newSteps);
  }

  return (
    <div>
      <NavBar />
      <div className="add-recipe">
        <h2>New Recipe</h2>
        <div className="first-row">
          <div className="first-column">
            <div style={{ width: '100%', height: '100%', border: '1px solid black' }}>
              Input Image
            </div>
          </div>
          <div className="second-column">
            <div className="field">
              <label>Name of your masterpiece 🧑‍🍳</label>
              <input type="text" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} placeholder="Grilled Cheese" style={{ minWidth: "300px" }} />
            </div>
            <div style={{display: 'flex', justifyContent: 'start'}}>
              <div className="field" style={{marginRight: '1rem'}}>
                <label>Prep Time</label>
                <div>
                  <input type="number" value={prepTime} onChange={(e) => setPrepTime(e.target.value)} placeholder="5" />
                  <span className="units">minutes</span>
                </div>
              </div>
              <div className="field">
                <label>Cook Time</label>
                <div>
                  <input type="number" value={cookTime} onChange={(e) => setCookTime(e.target.value)} placeholder="10" />
                  <span className="units">minutes</span>
                </div>
              </div>
            </div>
            <div className="field">
              <label>Description <span style={{fontSize: '1rem', fontStyle: 'italic'}}>(~keep it under 256 characters)</span></label>
              <textarea maxLength={256} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="The cheesiest grilled cheese sandwich" />
            </div>
          </div>
        </div>
        <div>
          <div className="field">
            <label>Ingredients</label>
            <div className="ingredients">
              <input type="number" placeholder="2" value={currentIngredient.quantity} onChange={ (e) => editCurrentIngredient(e.target.value, "quantity") } />
              <select style={{ marginRight: "0.5rem" }} defaultValue="unit" value={currentIngredient.unit} onChange={ (e) => editCurrentIngredient(e.target.value, "unit") }>
                <option value="g">g</option>
                <option value="kg">kg</option>
                <option value="ml">ml</option>
                <option value="l">l</option>
                <option value="tsp">tsp</option>
                <option value="tbsp">tbsp</option>
                <option value="cup">cup</option>
                <option value="pint">pint</option>
                <option value="quart">quart</option>
                <option value="gallon">gallon</option>
                <option value="oz">oz</option>
                <option value="lb">lb</option>
                <option value="unit">unit</option>
              </select>
              <input type="text" style={{ marginRight: "0.5rem" }} placeholder="Bread" value={currentIngredient.name} onChange={ (e) => editCurrentIngredient(e.target.value, "name") } />
              <button onClick={() => addIngredient() } disabled={!currentIngredient.name || !currentIngredient.quantity} ><AddIcon /></button>
            </div>
          </div>
          <div className="ingredient-list">
            {ingredients.length > 0 && ingredients.map((ingredient, index) => {
              let text = `${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`;
              return <Chip style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }} key={index} text={text} deleteChip={() => deleteIngredient(index)} />
            })}
          </div>
        </div>
        <div className="field" style={{ width: "100%"}}>
          <label>Steps</label>
          <div className="steps-input">
            <span className="step">{procedure.length + 1}</span>
            <textarea rows={3} value={currentStep} onChange={(e) => setCurrentStep(e.target.value)} placeholder="Cut the cheese into thin slices" />
            <button onClick={() => addStep()} disabled={!currentStep}><AddIcon/></button>
          </div>
        </div>
        {procedure.length > 0 && (
          <div className="steps-list">
            {procedure.map((step, index) => {
              let text = `${index + 1}. ${step}`;
              return <Chip style={{ width: '100%', marginBottom: '0.5rem'}} key={index} text={text} deleteChip={() => deleteStep(index)} />
            })}
          </div>
        )}
        <div>
          <button className="submit">Add Recipe</button>
        </div>
      </div>
    </div>
  );
}

export default AddEditRecipe;