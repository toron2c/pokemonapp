import {useContext} from "react";
import { useSelector} from "react-redux";
import ThemeContext from "../../../context";
import style from './list.module.scss'
import React from 'react'
import Spin from "../../../loader";
import {Item} from "./item/item";





export default function List() {
    const {isLight} = useContext(ThemeContext);
      const pokemonArr = useSelector(state => {
        const {list} = state;
        return list.initialPokemon;
    })

    let list = pokemonArr.map((el, idx) => <Item key={idx} id={el.id}/>)

    return (
        <div className={ isLight === true ? style.light : style.dark}>
            <React.Suspense fallback={<Spin />}>
                {list}
            </React.Suspense>
        </div>
    )
}