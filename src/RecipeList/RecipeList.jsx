import { useEffect, useState } from "react";

// Material UI Components
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// Material UI Icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CookieOutlinedIcon from '@mui/icons-material/CookieOutlined';

// Components
import AddEditRecipe from "../AddEditRecipe/AddEditRecipe";
import Recipe from "../Recipe/Recipe";

function RecipeList() {
  const localStorageKey = "recipeList";
  const [recipes, setRecipes] = useState([]);
	const [showRecipe, setShowRecipe] = useState(false);
	const [showRecipeEditor, setShowRecipeEditor] = useState(false);
	const [selectedRecipe, setSelectedRecipe] = useState(undefined);
	const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(-1);
  const [isTableLoading, setIsTableLoading] = useState(true);

  useEffect(() => {
    const localStorageRecipes = localStorage.getItem(localStorageKey);
    setIsTableLoading(false);
    if (!localStorageRecipes) return;
    const recipes = JSON.parse(localStorageRecipes);
    setRecipes(recipes);
    return;
  }, [])

  //Functions
  function saveChanges(editedRecipes) {
    localStorage.setItem(localStorageKey, JSON.stringify(editedRecipes));
  }

	function deleteRecipe(index) {
    const _recipes = [...recipes];
    _recipes.splice(index, 1);
    setRecipes(_recipes);
    saveChanges(_recipes);
	}

	function ediTableRecipe(recipe, index) {
		setShowRecipeEditor(true);
		setSelectedRecipe(recipe);
		setSelectedRecipeIndex(index);
	}

	function openRecipe(recipe, index) {
    setSelectedRecipeIndex(index);
		setSelectedRecipe(recipe);
		setShowRecipe(true);
	}

	function closeRecipe(isEdit, isDelete) {
    setShowRecipe(false);
    if (isEdit) {
      setShowRecipeEditor(true);
      return;
    } else if (isDelete) {
      deleteRecipe(selectedRecipeIndex);
    }
		setSelectedRecipe(null);
    setSelectedRecipeIndex(-1);
	}

	function closeRecipeEditor(index = -1, newRecipe = null) {
		setShowRecipeEditor(false);
		setSelectedRecipe(null);
    setSelectedRecipeIndex(-1);
    // Cancelled Changes
		if (!newRecipe) return;
    // New Recipe
    if (index === -1) {
      let _recipes = [newRecipe, ...recipes];
      setRecipes(_recipes);
      saveChanges(_recipes);
    } else {
      // Edited Recipe
      let _editedRecipes = [newRecipe, ...recipes];
      _editedRecipes.splice(index + 1, 1);
      setRecipes(_editedRecipes);
      saveChanges(_editedRecipes);
    }
    return;
	}

	return(
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
    }}>
      <Typography gutterBottom variant="h5" component="div" align="center">
        RecipeGenius <CookieOutlinedIcon />
      </Typography>
      {showRecipe && <Recipe handleClose={(isEdit, isDelete) => closeRecipe(isEdit, isDelete)} isOpen={showRecipe} selectedRecipe={selectedRecipe} />}
      {showRecipeEditor && <AddEditRecipe handleClose={(index, newRecipe) => closeRecipeEditor(index, newRecipe)} isOpen={showRecipeEditor} selectedRecipe={selectedRecipe} selectedRecipeIndex={selectedRecipeIndex} />}
      {isTableLoading && <CircularProgress />}
      {!isTableLoading && (
        <TableContainer
          sx={{
            width: "700px",
          }}
        >
          <Table>
            <TableBody>
            {recipes.map((recipe, key) => {
              return (
                <TableRow hover={true}>
                  <TableCell width="90%" sx={{ cursor: 'pointer'}} onClick={() => openRecipe(recipe, key)}>
                    {recipe.recipeName}
                  </TableCell>
                  <TableCell width="5%">
                    <IconButton disabled={showRecipe || showRecipeEditor} color="info" onClick={() => ediTableRecipe(recipe, key)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell width="5%">
                    <IconButton disabled={showRecipe || showRecipeEditor} color="error" onClick={() => deleteRecipe(key)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
            {recipes.length === 0 && (
              <TableRow>
                <TableCell>No Recipes Found</TableCell>
              </TableRow>
            )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Button disabled={showRecipe || showRecipeEditor} variant="outlined" startIcon={<AddIcon />} onClick={() => setShowRecipeEditor(true)} sx={{
        marginTop: '20px',
      }}>
        New Recipe
      </Button>
    </div>
  )
}

export default RecipeList;