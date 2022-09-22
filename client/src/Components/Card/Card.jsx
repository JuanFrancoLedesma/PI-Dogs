import React from 'react';
import { useState, useEffect } from 'react'; //Manejar estado interno y ciclo de vida

export default function Card(props){
    const {name,height,weight,life_span,image,temperament} = props

    return(
        <div>
            <h2>{name}</h2>
            <img src={image} alt='No se encontro imagen perruna' width='200px' height='200px'/>
            <h3>{height}</h3>
            <h3>{weight}</h3>
            <h3>{life_span}</h3>
            <h3>{temperament}</h3>
        </div>
    )
}

