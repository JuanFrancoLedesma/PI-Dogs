import axios from "axios";
import {
  GET_BREEDS,
  GET_TEMPERAMENTS,
  GET_BREEDS_BY_NAME,
  FILTER_CREATED,
  FILTER_TEMPERAMENT,
  FILTER_WEIGHT,
  FILTER_ALF,
} from "./Action_type";

export function getBreeds() {
  return async function (dispatch) {
    try {
      const breeds = await axios.get("http://localhost:3001/dogs");
      return dispatch({
        type: GET_BREEDS,
        payload: breeds.data,
      });
    } catch (error) {
      return dispatch({
        type: GET_BREEDS_BY_NAME,
        payload: error.response.data,
      });
    }
  };
}

export function getBreedsByName(name) {
  return async function (dispatch) {
    try {
      const breeds = await axios.get(`http://localhost:3001/dogs?name=${name}`);
      return dispatch({
        type: GET_BREEDS_BY_NAME,
        payload: breeds.data,
      });
    } catch (error) {
      return dispatch({
        type: GET_BREEDS_BY_NAME,
        payload: error.response.data,
      });
    }
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    try {
      const temperaments = await axios.get(
        "http://localhost:3001/temperaments"
      );
      return dispatch({
        type: GET_TEMPERAMENTS,
        payload: temperaments.data,
      });
    } catch (error) {
      return dispatch({
        type: GET_BREEDS_BY_NAME,
        payload: error.response.data,
      });
    }
  };
}

export function filterByCreated(payload){
  return{
    type: FILTER_CREATED,
    payload
  }
}

export function filterByTemperament(payload){
  return{
    type: FILTER_TEMPERAMENT,
    payload
  }
}

export function filterByWeight(payload){
  return{
    type: FILTER_WEIGHT,
    payload
  }
}

export function filterByAlf(payload){
  console.log('entre a la action');
  return{
    type: FILTER_ALF,
    payload
  }
}