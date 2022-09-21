import { GET_BREEDS } from "../Actions/Action_type";

const initialState = {
    breeds : []
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_BREEDS:
            return{
                ...state,
                breeds : action.payload  
            }
        default:
            return {
                ...state
            }
    }
}

export default rootReducer;