import Search from "./pokemonApp/search/search";
import List from "./pokemonApp/list/list";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {pokemonLoad} from "../redux/actions";


export default function PokemonApp()  {
    const dispatch = useDispatch()
    const list = useSelector(state => {
        return state.list.allPokemon
    })

    useEffect(() => {
        if (list.length === 0) {
            dispatch(pokemonLoad())
        }
    }, [])

    return <div>
        <Search />
        <List />
    </div>
}