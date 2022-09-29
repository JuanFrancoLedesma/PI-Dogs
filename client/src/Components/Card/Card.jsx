import React from "react";
import "./Card.css";

export default function Card(props) {
  const { id, name, height, weight, life_span, image, temperament } = props;

  return (
    <div>
      <div className="cardContainer">
        <div className="cardTitle">
          <h2>{name}</h2>
        </div>
        <div className="cardImg">
          <img
            src={image}
            alt="No se encontro imagen perruna"
            width="200px"
            height="200px"
          />
        </div>
        <div className="cardInfo">
          <div className="elemento">
            <div className="atributo">
              <h3>Altura: </h3>
            </div>
            <div className="info">
              <h3>{height}</h3>
            </div>
          </div>
          <div className="elemento">
            <div className="atributo">
              <h3>Peso: </h3>
            </div>
            <div className="info">
              <h3>{weight}</h3>
            </div>
          </div>
          <div className="elemento">
            <div className="atributo">
              <h3>Años de vida: </h3>
            </div>
            <div className="info">
              <h3>{life_span}</h3>
            </div>
          </div>
        </div>
        <div className="temperamentos">
          <h3>Temperamentos</h3>
          <h3>{temperament}</h3>
        </div>
      </div>
    </div>
  );
}
