import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { breedDelete, getBreedById, getBreeds } from "../../Actions";
import { useParams } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import Card from "../Card/Card";
import "./Detail.css";

export default function Breed() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    dispatch(getBreedById(id));
    return () => dispatch(getBreedById([]));
  }, []);

  const breed = useSelector((state) => state.breed);

  function deleted(e,id){
    e.preventDefault();
    dispatch(breedDelete(id))
    setTimeout(()=>history.push('/home'),1000)
  }

  return (
    <div className="detailContainer">
      <div className="detailbtn">
        <Link to="/home">
          <button>Home</button>
        </Link>
      </div>
      <div className="card">
        {breed.createdByUser ? (
          <button onClick={(e)=>{deleted(e,breed.id)}}>Delete</button>
        ) : (
          <button disabled="true">Delete</button>
        )}
        {
          
        }
        <Card
          id={breed.id} //Para enviar un posible delete
          createdByUser={breed.createdByUser} //Para luego usarlo como condicion de renderizado
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
    </div>
  );
}
