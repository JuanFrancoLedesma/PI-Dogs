import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="contein">
      <div>
        <div className="tittleLanding">
          <h1>D O G S</h1>
        </div>
      </div>
      <Link className="linkto" to="/home">
        <button className="button">Ingresar</button>
      </Link>
    </div>
  );
}
