import {INPUT_SEARCH} from "./types";

const initialState = {
    text: ''
}

export const inputReducer = (state=initialState, action) => {
  //  console.log(`input search Reducer >> ${action}`);

    switch(action.type) {
        case INPUT_SEARCH:
            return {
                ...state,
                text: action.text
            }
        default:
            return state
    }
}