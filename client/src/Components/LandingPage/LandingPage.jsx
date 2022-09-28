import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className='body'>
      <Link to="/home">
        <button className='button'>
          Ingresar
        </button>
      </Link>
    </div>
  );
}
