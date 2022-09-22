import axios from 'axios';
import { GET_BREEDS, GET_TEMPERAMENTS } from './Action_type';

export function getBreeds(){
    return async function(dispatch){
        const breeds = await axios.get('http://localhost:3001/dogs');
        return dispatch({
            type: GET_BREEDS,
            payload: breeds.data
        })
    }
}

export function getTemperaments(){
    return async function(dispatch){
        const temperaments = await axios.get('http://localhost:3001/temperaments');
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: temperaments.data
        })
    }
}