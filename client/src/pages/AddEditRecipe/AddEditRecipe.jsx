import React, { useState, useEffect } from 'react';
import Chip from '../../components/Chip/Chip';
import AddIcon from '@mui/icons-material/Add';
import NavBar from '../../components/NavBar/NavBar';
import './style.css';
import axios from 'axios';
import foodImage from '../../images/food-bowl.jpg';
import { useParams, useNavigate } from 'react-router-dom';


function AddEditRecipe() {
  const {recipe_id} = useParams();
  const navigate = useNavigate();

  const [isEditForm, setIsEditForm] = useState(false);
  const [recipeName, setRecipeName] = useState(null);
  const [description, setDescription] = useState(null);
  const [procedure, setProcedure] = useState([]);
  const [cookTime, setCookTime] = useState(null);
  const [prepTime, setPrepTime] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState({
    quantity: null,
    unit: 'unit',
    name: null,
    ingredient_id: null,
  });
  const [currentStep, setCurrentStep] = useState(null);

  useEffect(() => {
    if (!recipe_id) return;
    console.log( `Fetching recipe with id ${recipe_id}`);
    async function getRecipe() {
      try {
        const recipeInfo = await axios.get(`http://localhost:8080/recipes/${recipe_id}`);
        const recipe = recipeInfo.data.recipe;
        const ingredients = recipeInfo.data.ingredients;
        setIngredients(ingredients);
        setRecipeName(recipe.name);
        setDescription(recipe.description);
        setProcedure(recipe.procedure);
        setCookTime(recipe.cook_time);
        setPrepTime(recipe.prep_time);
        setIsEditForm(true);
        console.log(recipeInfo);
      } catch(err) {
        navigate('/not-found');
        console.log(err);
      }
      
    }
    getRecipe();
  }, [recipe_id]);

  async function addIngredient(e) {
    e.preventDefault();
    try {
      const name = currentIngredient.name.toLowerCase().trim();
      const response = await axios.post(`http://localhost:8080/ingredients/add`, { name });
      const newIngredientData = response.data[0];
      const newIngredient = { ...currentIngredient, ingredient_id: newIngredientData.ingredient_id};
      setIngredients([...ingredients, newIngredient]);
      setCurrentIngredient({
        quantity: '',
        unit: 'unit',
        name: '',
        ingredient_id: null,
      });
      console.log('adding ingredient');
      console.log(response);
    } catch(err) {
      console.log(err);
    }
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

  async function deleteIngredient(index, e) {
    e.preventDefault();
    if (isEditForm && ingredients[index].recipe_ingredient_id !== undefined) {
      try {
        const response = await axios.delete(`http://localhost:8080/recipe_ingredients/delete/${ingredients[index].recipe_ingredient_id}`);
        console.log(response);
      } catch(err) {
        console.log(err);
      }
    }
    const newIngredients = ingredients.filter((ingredient, i) => i !== index);
    setIngredients(newIngredients);
  }

  function deleteStep(index) {
    const newSteps = procedure.filter((step, i) => i !== index);
    setProcedure(newSteps);
  }

  async function submitRecipe(e) {
    e.preventDefault();
    try {
      if (isEditForm) {
        const response = await axios.put(`http://localhost:8080/recipes/edit/${recipe_id}`, {
          name: recipeName,
          description,
          procedure,
          cook_time: cookTime,
          prep_time: prepTime,
          last_modified: new Date(),
        });
        const newIngredients = ingredients.filter(ingredient => ingredient.recipe_ingredient_id === undefined);
        const recipe_ingredients_response = await axios.post('http://localhost:8080/recipe_ingredients/add-multiple', {
          recipe_ingredients: newIngredients,
          recipe_id,
        })
        console.log(response);
        console.log(recipe_ingredients_response);
      } else {
        const response = await axios.post(`http://localhost:8080/recipes/add`, {
          name: recipeName,
          description,
          procedure,
          cook_time: cookTime,
          prep_time: prepTime,
          last_modified: new Date(),
        });
        const newRecipe = response.data[0];
        await axios.post('http://localhost:8080/recipe_ingredients/add-multiple', {
          recipe_ingredients: ingredients,
          recipe_id: newRecipe.recipe_id,
        })
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
    navigate('/recipes');
  }

  return (
    <div>
      <NavBar />
      <form className="add-recipe">
        <h2>{isEditForm ? 'Edit Recipe' : 'New Recipe'}</h2>
        <div className="first-row">
          <div className="first-column">
            <img src={foodImage} alt="Food Image" style={{ width: '250px', height: '250px'}} />
          </div>
          <div className="second-column">
            <div className="field">
              <label>Name of your masterpiece 🧑‍🍳</label>
              <input maxLength={255} type="text" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} placeholder="Grilled Cheese" style={{ minWidth: "300px" }} />
            </div>
            <div style={{display: 'flex', justifyContent: 'start'}}>
              <div className="field" style={{marginRight: '1rem'}}>
                <label>Prep Time 🥣</label>
                <div>
                  <input type="number" value={prepTime} onChange={(e) => setPrepTime(e.target.value)} placeholder="5" />
                  <span className="units">minutes</span>
                </div>
              </div>
              <div className="field">
                <label>Cook Time 🥘</label>
                <div>
                  <input type="number" value={cookTime} onChange={(e) => setCookTime(e.target.value)} placeholder="10" />
                  <span className="units">minutes</span>
                </div>
              </div>
            </div>
            <div className="field">
              <label>Description 📖<span style={{fontSize: '1rem', fontStyle: 'italic'}}>(~keep it under 256 characters)</span></label>
              <textarea maxLength={255} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="The cheesiest grilled cheese sandwich" />
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
              <input maxLength={255} type="text" style={{ marginRight: "0.5rem" }} placeholder="Bread" value={currentIngredient.name} onChange={ (e) => editCurrentIngredient(e.target.value, "name") } />
              <button onClick={(e) => addIngredient(e) } disabled={!currentIngredient.name || !currentIngredient.quantity} ><AddIcon /></button>
            </div>
          </div>
          <div className="ingredient-list">
            {ingredients.length > 0 && ingredients.map((ingredient, index) => {
              let text = `${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`;
              return <Chip key={index} text={text} deleteChip={(e) => deleteIngredient(index, e)} />
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
              return <Chip style={{ width: '100%' }} key={index} text={text} deleteChip={() => deleteStep(index)} />
            })}
          </div>
        )}
        <div>
          {(!ingredients || !recipeName || !prepTime || !cookTime || !description || !procedure) && <p className="error">*finish your 🥦 first... I mean fields</p>}
          <button disabled={!ingredients || !recipeName || !prepTime || !cookTime || !description || !procedure} type="submit" className="submit" onClick={async (e) => await submitRecipe(e)}> {isEditForm? 'Save Changes' : 'Add Recipe'}</button>
        </div>
      </form>
    </div>
  );
}

export default AddEditRecipe;