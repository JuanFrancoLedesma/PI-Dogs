import React from "react";
import { Link } from "react-router-dom";

export default function Card(props) {
  const { id, name, height, weight, life_span, image, temperament } = props;

  return (
    <div>
      <div>
        <Link to="/home">
          <button>Home</button>
        </Link>
      </div>
      <div>
        <h1>{id}</h1>
        <h2>{name}</h2>
        <img
          src={image}
          alt="No se encontro imagen perruna"
          width="200px"
          height="200px"
        />
        <h3>{height}</h3>
        <h3>{weight}</h3>
        <h3>{life_span}</h3>
        <h3>{temperament}</h3>
      </div>
    </div>
  );
}
