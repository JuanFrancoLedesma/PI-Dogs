import {
  GET_BREEDS,
  GET_TEMPERAMENTS,
  GET_BREEDS_BY_NAME,
  FILTER_CREATED,
  FILTER_TEMPERAMENT,
  FILTER_WEIGHT,
  FILTER_ALF,
} from "../Actions/Action_type";

const initialState = {
  breeds: [],
  allBreeds: [], //copia de seguridad
  temperaments: [],
  error: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BREEDS:
      return {
        ...state,
        breeds: action.payload,
        allBreeds: action.payload,
      };
    case GET_TEMPERAMENTS: {
      return {
        ...state,
        temperaments: action.payload,
      };
    }
    case FILTER_CREATED: {
      const filterBreeds = //Aca me guardo las razas filtradas segun el estado actual de mi filtro
        action.payload === "created"
          ? state.allBreeds.filter((b) => b.createdByUser)
          : state.allBreeds.filter((b) => !b.createdByUser);
          console.log(state.breeds);
          console.log(state.allBreeds);
      return {
        ...state,
        breeds: action.payload === "all" ? state.breeds : filterBreeds,
      };
    }
    case FILTER_TEMPERAMENT:
      const filterBreeds = state.allBreeds.filter((b) =>
        b.temperament?.includes(action.payload)
      );
      return {
        ...state,
        breeds: action.payload === "all" ? state.allBreeds : filterBreeds,
      };
    case FILTER_WEIGHT:
      let sortedArr =
        action.payload === "asc"
          ? state.breeds.sort((a, b) => {
              if (a.weightProm > b.weightProm) return 1;
              if (b.weightProm > a.weightProm) return -1;
              return 0;
            })
          : state.breeds.sort((a, b) => {
              if (a.weightProm > b.weightProm) return -1;
              if (b.weightProm > a.weightProm) return 1;
              return 0;
            });
      return {
        ...state,
        breeds: action.payload === "all" ? state.allBreeds : sortedArr,
      };
    case FILTER_ALF:
      let sortArr =
        action.payload === "AZ"
          ? state.breeds.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.breeds.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });
      return {
        ...state,
        breeds: action.payload === "all" ? state.allBreeds : sortArr,
      };
    case GET_BREEDS_BY_NAME:
      if (typeof action.payload === "string") {
        return {
          ...state,
          breeds: [],
          error: action.payload,
        };
      }
      return {
        ...state,
        error: false,
        breeds: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}

export default rootReducer;
