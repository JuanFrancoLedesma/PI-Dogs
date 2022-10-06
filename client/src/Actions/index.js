import axios from "axios";
import {
  GET_BREEDS,
  GET_TEMPERAMENTS,
  GET_BREEDS_BY_NAME,
  FILTER_CREATED,
  FILTER_TEMPERAMENT,
  FILTER_WEIGHT,
  FILTER_ALF,
  GET_BREED_BY_ID,
  BREED_DELETE,
  BREED_UPDATE,
} from "./Action_type";

export function getBreeds() {
  return async function (dispatch) {
    try {
      const breeds = await axios.get("/dogs");
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
      const breeds = await axios.get(`/dogs?name=${name}`);
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

export function getBreedById(id){
  return async function(dispatch) {
    try{
      const breed = await axios.get(`/dogs/${id}`)
      return dispatch({
        type: GET_BREED_BY_ID,
        payload: breed.data
      })
    } catch(error){
      return dispatch({
        type: GET_BREED_BY_ID,
        payload: error.response.data,
      });
    }
  }
}

export function getTemperaments() {
  return async function (dispatch) {
    try {
      const temperaments = await axios.get(
        "/temperaments"
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

export function filterByCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}

export function filterByTemperament(payload) {
  return {
    type: FILTER_TEMPERAMENT,
    payload,
  };
}

export function filterByWeight(payload) {
  return {
    type: FILTER_WEIGHT,
    payload,
  };
}

export function filterByAlf(payload) {
  return {
    type: FILTER_ALF,
    payload,
  };
}

export function breedCreate(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post("/dogs", payload);
      alert('Raza creada exitosamente!')
      return response
    } catch (error) {
      alert(`Algo fallo con el siguiente error: `,error)
      return error
    }
  };
}

export function breedDelete(id) {
  return async function(dispatch) {
    try{
      const response = await axios.delete(`/dogs/delete/${id}`); //Esto elimina la raza de la base de datos, puff, ya no esta mas
      alert('Raza eliminada correctamente!')
      return{
        type: BREED_DELETE
      }
    } catch(error){
      alert('No se pudo eliminar la raza!')
    }
  }
}

export function breedUpdate(id,update){
  return async function(dispatch){
    try{
      const response = await axios.put(`/dogs/update/${id}`,update)
      alert(response.data)
      return {
        type: BREED_UPDATE
      }
    } catch(error){
      alert('No se pudo actualizar la raza')
    }
  } 
}


