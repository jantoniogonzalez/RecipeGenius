import {useState, useEffect} from 'react';

// Material UI Components
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

function AddEditRecipe({ isOpen, handleClose, selectedRecipe, selectedRecipeIndex }) {
  const [recipeName, setRecipeName] = useState(undefined)
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState(undefined);
  const [description, setDescription] = useState(undefined);
  const [procedure, setProcedure] = useState(undefined);
  const [showInputIngredient, setShowInputIngredient] = useState(false);

	useEffect(() => {
    if (!selectedRecipe) return;
    if (selectedRecipe.recipeName) setRecipeName(selectedRecipe.recipeName);
    if (selectedRecipe.ingredients) setIngredients(selectedRecipe.ingredients);
    if (selectedRecipe.description) setDescription(selectedRecipe.description);
    if (selectedRecipe.procedure) setProcedure(selectedRecipe.procedure);
	}, [selectedRecipe])

  function addIngredient() {
    const _ingredients = [...ingredients];
    _ingredients.push(newIngredient);
    setIngredients(_ingredients);
    setNewIngredient('');
  }

  function deleteIngredient(index) {
    const _ingredients = [...ingredients];
    _ingredients.splice(index, 1);
    setIngredients(_ingredients);
  }

	return(
		<Box>
			<Modal
				open={isOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
        }}
			>
				<Card sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}>
					<CardContent sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <Typography gutterBottom variant="h5" component="div" align="center">
              {selectedRecipeIndex === -1 ? 'Add Recipe' : 'Edit Recipe'}
            </Typography>
            <TextField
              required
              id="outlined-basic"
              label="Recipe Name"
              variant="outlined"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              margin='dense'
            />
            <TextField
              id="outlined-multiline-flexible"
              required
              label="Description"
              multiline
              maxRows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin='dense'
            />
           {ingredients.length > 0 && (
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
                {ingredients.map((ingredient, key) => {
                  return <Chip label={ingredient} variant="outlined" onDelete={() => deleteIngredient(key)} color='info' sx={{margin: '3px 3px 0px 3px'}} />
                })}
              </div>
            )}
            { !showInputIngredient && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setShowInputIngredient(true) }
                sx={{
                  marginTop: '10px',
                  marginBottom: '10px',
                }}  
              >
                Add Ingredient
              </Button>
            )}
            { showInputIngredient && (
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',   
              }}>
                <TextField
                  id="outlined-basic"
                  label="Ingredients"
                  variant="outlined"
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  margin='dense'
                />
                <IconButton onClick={() => addIngredient()} disabled={!newIngredient}>
                  <AddIcon />
                </IconButton>
              </div>
            )}
            <TextField
              id="outlined-multiline-flexible"
              required
              label="Procedure"
              multiline
              value={procedure}
              onChange={(e) => setProcedure(e.target.value)}
              margin='dense'
            />
					</CardContent>
					<CardActions>
						<Button onClick={() => handleClose( selectedRecipeIndex, {recipeName, ingredients, description, procedure})}>Save</Button>
						<Button onClick={() => handleClose(-1, null)}>Cancel</Button>
					</CardActions>
				</Card>
			</Modal>
		</Box>
	)
}

export default AddEditRecipe;