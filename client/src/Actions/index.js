import axios from 'axios';
import { GET_BREEDS } from './Action_type';

export function getBreeds(){
    return async function(dispatch){
        const breeds = await axios.get('http://localhost:3001/dogs',{
        });
        return dispatch({
            type: GET_BREEDS,
            payload: breeds.data
        })
    }
}