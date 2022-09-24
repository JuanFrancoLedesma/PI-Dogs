import React from "react";
import { useState, useEffect } from "react"; //Manejar estado interno y ciclo de vida
import { useDispatch, useSelector } from "react-redux"; //Manejar estado global, traer estado y enviar acciones
import {
  getBreeds,
  getTemperaments,
  filterByCreated,
  filterByTemperament,
  filterByWeight,
  filterByAlf,
} from "../../Actions"; //Traigo la action creator
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Page from "../Page/Page";
import SearchBar from "../SearchBar/SearchBar";

export default function Home() {
  const dispatch = useDispatch(); //Me permite utilizar dispatch
  const allBreeds = useSelector((state) => state.breeds); //Me traigo del estado global el array breeds. Reemplaza el mapStateToProps
  const error = useSelector((state) => state.error);
  const allTemperaments = useSelector((state) => state.temperaments); //Me traigo del estado global mi array de temperamentos

  useEffect(() => {
    dispatch(getBreeds()); //reemplaza el mapDispatchToProps. En cuanto renderice el componente, se despacha la action que llena mi estado global. El cual me traje con las lineas de arriba.
    dispatch(getTemperaments());
  }, []);

  const [orden, setOrden] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [breedsPerPage, setBreedsPerPage] = useState(8);
  const indexLastBreed = currentPage * breedsPerPage; //8 : indice de la novena raza
  const indexFirstBreed = indexLastBreed - breedsPerPage; //8 - 8 = 0 : indice de la primer raza
  const currentBreeds = allBreeds.slice(indexFirstBreed, indexLastBreed);

  function page(pageNumber) {
    setCurrentPage(pageNumber); //cambio el estado, haciendo que cambien los valores de todas mis constantes
  }

  function handleClick(e) {
    //Boton para volver a cargar las razas de perros
    e.preventDefault();
    dispatch(getBreeds());
  }

  function showError(error) {
    return <h1>{error}</h1>;
  }

  function handleCreatedFilter(e) {
    dispatch(filterByCreated(e.target.value));
  }

  function handleTemperamentFilter(e) {
    dispatch(filterByTemperament(e.target.value));
  }

  function handleWeightFilter(e) {
    e.target.value === 'all' ? dispatch(getBreeds()) : dispatch(filterByWeight(e.target.value));
    setCurrentPage(1)
    setOrden(`Ordenado ${e.target.value}`)
  }

  function handleAlfFilter(e) {
    e.target.value === 'all' ? dispatch(getBreeds()) : dispatch(filterByAlf(e.target.value));
    setCurrentPage(1)
    setOrden(`Ordenado ${e.target.value}`)
  }

  return (
    <div>
      <Link to="/dogs">Crear raza</Link>
      <h1>Vamo lo peerrrooo</h1>
      <div>
        <SearchBar />
      </div>
      <button onClick={(e) => handleClick(e)}>
        Volver a cargar todas las razas
      </button>
      <div>
        {/* Filtro por temperamentos */}
        <select onChange={(e) => handleTemperamentFilter(e)}>
          <option value="all">Temperamentos</option>
          {allTemperaments?.map((t, i) => {
            return (
              <option value={t} key={i}>
                {t}
              </option>
            );
          })}
        </select>
        {/* Filtro por creacion */}
        <select onChange={(e) => handleCreatedFilter(e)}>
          <option value="all">Origen</option>
          <option value="created">Created by user</option>
          <option value="api">Api</option>
        </select>
        {/* Filtro por peso */}
        <select onChange={(e) => handleWeightFilter(e)}>
          <option value="all">Peso</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        {/* Filtro alfabetico */}
        <select onChange={(e) => handleAlfFilter(e)}>
          <option value="all">Alfabeticamente</option>
          <option value="AZ">A-Z</option>
          <option value="ZA">Z-A</option>
        </select>
        <Page
          breedsPerPage={breedsPerPage}
          allBreeds={allBreeds.length}
          page={page}
        />
      </div>
      <div>
        <h1>Razas</h1>
      </div>
      <div>
        {typeof error === "string" && showError(error)}
        {currentBreeds?.map((e) => {
          //renderizado condicional
          return (
            <Card
              name={e.name}
              height={e.height}
              weight={e.weight}
              life_span={e.life_span}
              image={e.image? e.image : 'https://img.freepik.com/foto-gratis/labrador-retriever_95678-27.jpg?w=2000'}
              temperament={e.temperament}
            />
          );
        })}
      </div>
    </div>
  );
}
