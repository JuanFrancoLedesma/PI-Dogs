import React from 'react';
import './Page.css'

export default function Page({breedsPerPage,allBreeds,page,current}){
    const pageNumbers = []; //Aca me voy a ir guardando cada numero posible para el paginado
    
    for (let i = 0; i < Math.ceil(allBreeds/breedsPerPage); i++) { //Esto me guardara tantos numeros como sean necesarios para que todas las razas tengan su pagina y estas tengan el maximo permitido o disponible
        pageNumbers.push(i+1)
    }

    return(
        <nav> 
            <div className='paginado'>
                {pageNumbers && 
                pageNumbers.map(number => ( //Creo una barra de navegacion con una lista desordenada, por cada numero conseguido creo un elemento de dicha lista que sera un link que cambiara mi estado de currentPage
                    <div  key={number}>
                        <button className={number === current ? 'active' : 'btn'} onClick={()=>page(number)}>{number}</button>
                    </div>
                ))}
            </div>
        </nav>
    )

}