import './style.css';
import homeImage from '../../images/home_image.svg';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import AllRecipes from '../AllRecipes/AllRecipes';

function HomePage() {
  return(
    <div>
      <div className="home-container">
        <NavBar />
        <div className="main-section">
          <div className="main-text">
            <h2>Enter once, access everywhere</h2>
            <p>No need for a more notebooks and cookbooks. Create, update, and share your recipes here.</p>
            <Link to="/recipes">
              <button>Get Started <ArrowForwardRoundedIcon style={{ marginLeft: '0.5rem' }} /></button>
            </Link>
          </div>
          <div className="main-image">
            <img className="home-image" src={homeImage} alt="recipe image" />
          </div>
        </div>
      </div>
      <AllRecipes />
    </div>

  );
}

export default HomePage;