import { Link } from 'react-router-dom';
import './style.css';

function NavBar() {
  return(
    <nav className="nav-bar">
        <Link to="/"><h1 className="logo">RecipeGenius</h1></Link>
        <div className="links">
          <Link to="/recipes">All Recipes</Link>
          <Link to="/recipe/add">
            <button>New Recipe</button>
          </Link>
        </div>
    </nav>
  )
}

export default NavBar;