import HomePage from './pages/HomePage/HomePage.jsx';
import AllRecipes from './pages/AllRecipes/AllRecipes.jsx';
import AddEditRecipe from './pages/AddEditRecipe/AddEditRecipe.jsx';
import RecipeList from './RecipeList/RecipeList.jsx';
import {
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import '@fontsource-variable/inter';

function App() {

  return (
    <Routes>
      <Route path="/recipes" element={<AllRecipes />} />
      <Route path="/recipe/add" element={<AddEditRecipe />} />
      <Route path="/recipe/edit/:recipe_id" element={<AddEditRecipe  />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}

export default App
