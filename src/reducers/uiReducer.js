import { types } from "../types/types";

//this is the definition of the reducer for the modal
const initialState = {
    modalOpen: false
}


export const uiReducer = ( state = initialState, action )=> {

    switch ( action.type ) {
        case types.uiOpenModal:
            
            return {
                ...state,
                modalOpen: true
            }
        case types.uiCloseModal: 

            return {
                ...state,
                modalOpen: false
            }
        default:
            return state;
    }
}