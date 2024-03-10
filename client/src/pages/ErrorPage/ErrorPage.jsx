import React from "react";
import errorImage from '../../images/page_not_found.svg';
import NavBar from "../../components/NavBar/NavBar";

function ErrorPage() {
  return (
    <div style={{ padding: '1rem calc((100vw - 1000px) / 2)' }}>
      <NavBar />
      <img src={errorImage} alt="Page Not Found" style={{width: '100%'}} />
    </div>
  )
}

export default ErrorPage;