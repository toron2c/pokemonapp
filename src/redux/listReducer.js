import {
    ADD_SEARCH_POKEMON,
    INFO_POKEMON_LOAD,
    POKEMON_LOAD,
    REMOVE_ITEM,
    SEARCH_POKEMON
} from "./types";

const initialState = {
    allPokemon: [],
    initialPokemon: [],
    findPokemon: {
        url: undefined,
        res: true,
        repeat: false
    }
}

export const listReducer = (state=initialState, action) => {
    switch(action.type) {
        case POKEMON_LOAD:
            const newAllPokemon = action.data.map(el => {
                return {
                    id: el.url.split('/')[6],
                    name: el.name,
                    info: el.url
                }
            })
            return {
                ...state,
                allPokemon: newAllPokemon,
            }
        case INFO_POKEMON_LOAD:
            const pokemon = action.data;
            if (state.initialPokemon.find(el=> el.id === pokemon.id)) {
                return state;
            }
            return {
                    ...state,
                    initialPokemon: [...state.initialPokemon, pokemon]
                }


        case REMOVE_ITEM:
            let new_initial_state = state.initialPokemon.filter((el) => el.id !== action.index)
            return {
                ...state,
                initialPokemon: new_initial_state
            }
        case SEARCH_POKEMON:
            let res = state.allPokemon.find(el => el.name === action.name)
            if (res) {

                let repeatRes = state.initialPokemon.find(el => el.name === action.name)
                if (repeatRes) {
                    console.log("Repeat res ===> ", repeatRes);
                    return {
                        ...state,
                        findPokemon: {
                                ...state.findPokemon, url:undefined, res: true, repeat: true
                        }
                    }
                } else {
                    let el = state.allPokemon.find(el => el.name === action.name)
                    console.log("el приходит сюда ===>",el);
                    return {
                        ...state,
                        findPokemon: {
                                ...state.findPokemon, url:el, res: true, repeat: false
                        }
                    }
                }
            } else {
                return {
                    ...state,
                    findPokemon: {
                            ...state.findPokemon, url: undefined
                        , res: false, repeat: false
                    }
                }
            }
            case ADD_SEARCH_POKEMON:
                let newInitialPokemon = state.initialPokemon;
                newInitialPokemon.unshift(action.data)
                return {
                    ...state,
                    initialPokemon: [...newInitialPokemon],
                    findPokemon: {
                        ...state.findPokemon,
                        url: undefined,
                        res: true,
                        repeat: false
                    }
                }

        default:
            return state;

    }
}

