import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div>
      <div className="contein">
        <div className="tittleLanding">
          <h1>Welcome to Dogs PI</h1>
        </div>
        <Link to="/home">
          <button className="button">Ingresar</button>
        </Link>
      </div>
    </div>
  );
}
