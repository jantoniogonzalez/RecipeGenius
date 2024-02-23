import HomePage from './pages/HomePage/HomePage.jsx';
import AllRecipes from './pages/AllRecipes/AllRecipes.jsx';
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
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}

export default App
