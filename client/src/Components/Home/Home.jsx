import React from 'react';
import { useState, useEffect } from 'react'; //Manejar estado interno y ciclo de vida
import {useDispatch, useSelector} from 'react-redux'; //Manejar estado global, traer estado y enviar acciones
import { getBreeds, getTemperaments } from '../../Actions'; //Traigo la action creator
import { Link } from 'react-router-dom'
import Card from '../Card/Card';
import Page from '../Page/Page';

export default function Home(){

    const dispatch = useDispatch(); //Me permite utilizar dispatch
    const allBreeds = useSelector((state)=>state.breeds) //Me traigo del estado global el array breeds. Reemplaza el mapStateToProps
    const allTemperaments = useSelector((state)=>state.temperaments) //Me traigo del estado global mi array de temperamentos
    
    useEffect(() => {
        dispatch(getBreeds()) //reemplaza el mapDispatchToProps. En cuanto renderice el componente, se despacha la action que llena mi estado global. El cual me traje con las lineas de arriba.
        dispatch(getTemperaments())
    },[])

    const [currentPage, setCurrentPage] = useState(1)
    const [breedsPerPage, setBreedsPerPage] = useState(8)
    const indexLastBreed = currentPage * breedsPerPage //8 : indice de la novena raza
    const indexFirstBreed = indexLastBreed - breedsPerPage //8 - 8 = 0 : indice de la primer raza
    const currentBreeds = allBreeds.slice(indexFirstBreed,indexLastBreed)

    function page(pageNumber){
        setCurrentPage(pageNumber) //cambio el estado, haciendo que cambien los valores de todas mis constantes
    }

    function handleClick(e){ //Boton para volver a cargar las razas de perros
        e.preventDefault();
        dispatch(getBreeds())
    }

    return(
        <div>
            <Link to='/dogs'>Crear raza</Link>
            <h1>Vamo lo peerrrooo</h1>
            <button onClick={(e)=>handleClick(e)}>
                Volver a cargar todas las razas
            </button>
            <div>
                <select>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
                <select>
                    {
                        allTemperaments?.map((t,i)=>{
                            return(
                                <option value={i}>{t}</option>
                            )
                        })
                    }
                </select>
                <select>
                    <option value='created'>Created by user</option>
                    <option value='notCreated'>Api</option>
                </select>
                <select>
                    <option value='AZ'>A-Z</option>
                    <option value='ZA'>Z-A</option>
                </select>
                <select>
                    <option value='AZ'>A-Z</option>
                    <option value='ZA'>Z-A</option>
                </select>
                <Page breedsPerPage={breedsPerPage} allBreeds={allBreeds.length} page={page}/>
            </div>
            <div>
                <h1>Razas</h1>
            </div>
            <div>
                {
                    currentBreeds?.map(e => { //renderizado condicional
                        return <Card name={e.name} height={e.height} weight={e.weight} life_span={e.life_span} image={e.image} temperament={e.temperament}/>
                    })
                }
            </div>
        </div>
    )

}