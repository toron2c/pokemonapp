import {combineReducers} from "redux";
import {listReducer} from "./listReducer";
import {inputReducer} from "./inputReducer";
import {appReducer} from "./appReducer";
export const rootReducer = combineReducers({
    list: listReducer,
    search: inputReducer,
    loader: appReducer
});
