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
import Page from "../Page/Page";
import SearchBar from "../SearchBar/SearchBar";
import "./HomePlus.css";
import HomeCard from "../HomeCard/HomeCard";

import x from "../../images/x.gif";
import perroBlanco from "../../images/perroBlanco.gif";
import perro from "../../images/perro.gif";

export default function Home() {
  const dispatch = useDispatch(); //Me permite utilizar dispatch
  const allBreeds = useSelector((state) => state.breeds); //Me traigo del estado global el array breeds. Reemplaza el mapStateToProps
  const error = useSelector((state) => state.error);
  const inicio = useSelector((state) => state.inicio);
  const aux = useSelector((state) => state.aux);
  const allTemperaments = useSelector((state) => state.temperaments); //Me traigo del estado global mi array de temperamentos
  const [orden, setOrden] = useState(""); //Estado que sirve para que el useEFfect vuelva a renderizar

  useEffect(() => {
    dispatch(getBreeds()); //reemplaza el mapDispatchToProps. En cuanto renderice el componente, se despacha la action que llena mi estado global. El cual me traje con las lineas de arriba.
    dispatch(getTemperaments());
  }, []);

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

  const loadingGif = require("../../images/perro.gif");

  function showError(error) {
    //Muestra error
    return (
      <div className="homeError">
        <h1>{error}</h1>
        <img src={x} alt="Cargando..." />
      </div>
    );
  }

  function loading() {
    return (
      <div className="loading">
        <img src={perroBlanco} alt="Loading..." />
      </div>
    );
  }

  function notFound() {
    return (
      <div className="loading">
        <img src={perro} alt="Loading..." />
        <h1>Ninguna raza cumple esas condiciones! Refresca!</h1>
      </div>
    );
  }

  function handleCreatedFilter(e) {
    dispatch(filterByCreated(e.target.value));
    setCurrentPage(1);
  }

  function handleTemperamentFilter(e) {
    dispatch(filterByTemperament(e.target.value));
    setCurrentPage(1);
  }

  function handleWeightFilter(e) {
    e.target.value === "all"
      ? dispatch(getBreeds())
      : dispatch(filterByWeight(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleAlfFilter(e) {
    e.target.value === "all"
      ? dispatch(getBreeds())
      : dispatch(filterByAlf(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div className="homeContainer">
      <div className="tittle">
        <h1>H</h1>
        <h1>E</h1>
        <h1>N</h1>
        <h1>R</h1>
        <h1>Y</h1>
        <h1> </h1>
        <h1>D</h1>
        <h1>O</h1>
        <h1>G</h1>
        <h1>S</h1>
      </div>
      <div className="subContainer">
        <div className="encabezado">
          <div className="filtrosContainer">
            {/* Filtro por temperamentos */}
            <div className="filtro">
              <select onChange={(e) => handleTemperamentFilter(e)}>
                <option value="default">Temperamentos</option>
                <option value="all">Todos</option>
                {allTemperaments?.map((t, i) => {
                  return (
                    <option value={t} key={i}>
                      {t}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="filtro">
              {/* Filtro por creacion */}
              <select onChange={(e) => handleCreatedFilter(e)}>
                <option key="0" value="default">
                  Origen
                </option>
                <option key="1" value="all">
                  All
                </option>
                <option key="2" value="created">
                  Created by user
                </option>
                <option key="3" value="api">
                  Api
                </option>
              </select>
              <i></i>
            </div>
            <div className="filtro">
              {/* Filtro por peso */}
              <select onChange={(e) => handleWeightFilter(e)}>
                <option key="4" value="all">
                  Peso
                </option>
                <option key="5" value="asc">
                  Ascendente
                </option>
                <option key="6" value="desc">
                  Descendente
                </option>
              </select>
            </div>
            <div className="filtro">
              {/* Filtro alfabetico */}
              <select onChange={(e) => handleAlfFilter(e)}>
                <option key="7" value="all">
                  Alfabeticamente
                </option>
                <option key="8" value="AZ">
                  A-Z
                </option>
                <option key="9" value="ZA">
                  Z-A
                </option>
              </select>
            </div>
            <button onClick={(e) => handleClick(e)}>
              <img
                src="https://us.123rf.com/450wm/jpgon/jpgon1704/jpgon170400954/76708517-ilustraci%C3%B3n-de-una-gota-de-agua-de-arte-de-l%C3%ADnea-aislada-con-una-cabeza-de-perro.jpg"
                alt="Refresh"
                height="50px"
              />
            </button>
          </div>
          <div className="search">
            <div className="btnContainer">
              <Link to="/breedCreate">
                <button className="createBtn">Crear raza</button>
              </Link>
            </div>
            <SearchBar page={page} />
          </div>
        </div>
        <div className="mostrador">
          {!inicio && loading()}
          {error && showError(error) || !aux || !allBreeds.length && notFound()}
          {currentBreeds?.map((e) => {
            return (
              <HomeCard
                image={
                  e.image
                    ? e.image
                    : "https://img.freepik.com/foto-gratis/labrador-retriever_95678-27.jpg?w=2000"
                }
                name={e.name}
                id={e.id}
              />
            );
          })}
        </div>
        <div className="paginado">
          <Page
            breedsPerPage={breedsPerPage}
            allBreeds={allBreeds.length}
            page={page}
            current={currentPage}
          />
        </div>
      </div>
    </div>
  );
}
