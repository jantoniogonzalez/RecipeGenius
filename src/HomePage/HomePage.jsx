import React from "react";
import './style.css'
import homeImage from '../images/home_image.svg'

function HomePage() {
  return(
    <div className="home-container">
      <div className="nav-bar">
        <h1 className="logo">RecipeGenius</h1>
        <div>Login</div>
      </div>
      <div className="main-section">
        <div className="main-text">
          <h2>Enter once, access everywhere</h2>
          <p>No need for a dozen notebooks and cookbooks. Create, update, and share your recipes here.</p>
          <button>Get Started</button>
        </div>
        <div className="main-image">
          <img className="home-image" src={homeImage} alt="recipe image" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;