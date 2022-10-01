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
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch(); //Me permite utilizar dispatch
  const allBreeds = useSelector((state) => state.breeds); //Me traigo del estado global el array breeds. Reemplaza el mapStateToProps
  const error = useSelector((state) => state.error); 
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

  function showError(error) {
    //Muestra error
    return <h1>{error}</h1>;
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
    <div className="container">
      <div className="encabezado">
        <div className="tittle">
          <h1>Henry Dogs</h1>
        </div>
        <div className="search">
          <Link to="/breedCreate">
            <button>Crear raza</button>
          </Link>
          <SearchBar page={page} />
        </div>
      </div>
      <div className="cuerpo">
        <div className="filtros">
          <div className="subtitulo">
            <h2>Filtrado</h2>
          </div>
          {/* Filtro por temperamentos */}
          <div>
            <select onChange={(e) => handleTemperamentFilter(e)}>
              <option value='default'>Temperamentos</option>
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
          <div>
            {/* Filtro por creacion */}
            <select onChange={(e) => handleCreatedFilter(e)}>
              <option key='0' value='default'>Origen</option>
              <option key='1' value="all">All</option>
              <option key='2' value="created">Created by user</option>
              <option key='3' value="api">Api</option>
            </select>
            <i></i>
          </div>
          <div className="subtitulo">
            <h2>Ordenado</h2>
          </div>
          <div>
            {/* Filtro por peso */}
            <select onChange={(e) => handleWeightFilter(e)}>
              <option key='4' value="all">Peso</option>
              <option key='5' value="asc">Ascendente</option>
              <option key='6' value="desc">Descendente</option>
            </select>
          </div>
          <div>
            {/* Filtro alfabetico */}
            <select onChange={(e) => handleAlfFilter(e)}>
              <option key='7' value="all">Alfabeticamente</option>
              <option key='8' value="AZ">A-Z</option>
              <option key='9' value="ZA">Z-A</option>
            </select>
          </div>
          <button onClick={(e) => handleClick(e)}>
            Volver a cargar todas las razas
          </button>
        </div>
        <div className="muestra">
          <div className="tarjetas">
            {console.log('estado de error: ',error)}
            {error && showError(error)}
            {currentBreeds?.map((e) => {
              //renderizado condicional
              return (
                <div className="breed">
                  <img
                    src={
                      e.image
                        ? e.image
                        : "https://img.freepik.com/foto-gratis/labrador-retriever_95678-27.jpg?w=2000"
                    }
                    width="150px"
                    height="150px"
                  />
                  <div className="texto">
                    <div className="link">
                      <Link
                        className="linkedin"
                        key={e.id}
                        to={`/detail/${e.id}`}
                      >
                        <h3>{e.name}</h3>
                      </Link>
                    </div>
                    <h3>{e.temperament}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="page">
            <Page
              breedsPerPage={breedsPerPage}
              allBreeds={allBreeds.length}
              page={page}
              current={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
