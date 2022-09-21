import React from 'react';
import { useState, useEffect } from 'react'; //Manejar estado interno y ciclo de vida
import {useDispatch, useSelector} from 'react-redux'; //Manejar estado global, traer estado y enviar acciones
import { getBreeds } from '../../Actions'; //Traigo la action creator
import { Link } from 'react-router-dom'
import Card from '../Card/Card';

export default function Home(){

    const dispatch = useDispatch(); //Me permite utilizar dispatch
    const allBreeds = useSelector((state)=>state.breeds) //Me traigo del estado global el array breeds. Reemplaza el mapStateToProps

    useEffect(() => {
        dispatch(getBreeds()) //reemplaza el mapDispatchToProps. En cuanto renderice el componente, se despacha la action que llena mi estado global. El cual me traje con las lineas de arriba.
    },[])

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
            </div>
            <div>
                {
                    allBreeds && allBreeds.map(e => { //renderizado condicional
                        return <Card name={e.name} height={e.height} weight={e.weight} life_span={e.life_span} image={e.image} temperament={e.temperament}/>
                    })
                }
            </div>
        </div>
    )

}