import {
    INFO_POKEMON_LOAD,
    INPUT_SEARCH,
    POKEMON_LOAD,
    LOADER_DISPLAY_OFF,
    LOADER_DISPLAY_ON,
    REMOVE_ITEM,
    SEARCH_POKEMON,
    ADD_SEARCH_POKEMON,
} from "./types";
import axios from "axios";


export function inputSearch(text) {
    return {
        type: INPUT_SEARCH,
        text
    }
}

export function pokemonLoad() {
    return async dispatch => {
        dispatch(loaderOn())
        let infoPokemon;
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
         .then(response => {
             infoPokemon = response.data.results.slice(0, 20);
             infoPokemon = infoPokemon.map(el => dispatch(infoPokemonLoad(el)))
         return response.data.results
         })


    dispatch({
        type: POKEMON_LOAD,
        data: response
    });
        dispatch(loaderOff())
    }
}

export function infoPokemonLoad(el) {

    return async dispatch => {
        dispatch(loaderOn())
        const response = await axios.get(el.url)
            .then(response => {
                return {
                    id: el.url.split('/')[6],
                    name: el.name,
                    forms: response.data.forms.length,
                    img: response.data.sprites.front_default
                }
            })

        dispatch({
            type: INFO_POKEMON_LOAD,
            data: response
        });
        dispatch(loaderOff())
    }
}

export function loaderOn() {
    return {
        type: LOADER_DISPLAY_ON
    }
}
export function loaderOff() {
    return {
        type: LOADER_DISPLAY_OFF
    }
}

export function removeItem(idx) {
    return {
        type: REMOVE_ITEM,
        index: idx
    }
}

export function searchPokemon(name) {
    return {
        type: SEARCH_POKEMON,
        name: name
    }
}
export function addSearchPokemon(el) {
    return async dispatch => {
        dispatch(loaderOn())
        const response = await axios.get(el.info)
            .then(response => {
                return {
                    id: el.info.split('/')[6],
                    name: el.name,
                    forms: response.data.forms.length,
                    img: response.data.sprites.front_default
                }
            })

        dispatch({
            type: ADD_SEARCH_POKEMON,
            data: response
        });
        dispatch(loaderOff())
    }
}
