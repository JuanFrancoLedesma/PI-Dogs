import React from "react";
import "./HomeCard.css";
import { Link } from "react-router-dom";

export default function HomeCard({ image, name,id }) {
  return (
    <Link className="HomeCardContainer" to={`/detail/${id}`}>
        <img className="img" src={image} />
        <h2 className="cardH2">{name}</h2>
    </Link>
  );
}
