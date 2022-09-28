import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreedById } from "../../Actions";
import { useParams } from "react-router-dom";
import Card from "../Card/Card";

export default function Breed() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBreedById(id));
  }, []);
  useEffect(()=>{
    return(()=>dispatch(getBreedById([])) )
  },[])
  const breed = useSelector((state) => state.breed);
  return (
    <div>
      <Card
        name={breed.name}
        height={breed.height}
        weight={breed.weight}
        life_span={breed.life_span}
        image={
          breed.image
            ? breed.image
            : "https://img.freepik.com/foto-gratis/labrador-retriever_95678-27.jpg?w=2000"
        }
        temperament={breed.temperament}
      />
    </div>
  );
}
