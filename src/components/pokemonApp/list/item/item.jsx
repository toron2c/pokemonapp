import {useDispatch, useSelector} from "react-redux";
import {removeItem} from "../../../../redux/actions";
import {useContext} from "react";
import ThemeContext from "../../../../context";
import style from './item.module.scss'
import {Button} from "@mui/joy";

export function Item(props) {
    const dispatch = useDispatch();
    const {isLight} = useContext(ThemeContext)
    function handleDelete(e) {
        e.preventDefault();
        dispatch(removeItem(props.id))
    }
    let pokemon = useSelector(state => {
        const {list} = state;
        return list.initialPokemon.find(el => el.id === props.id);
    })

    return <div className={ isLight === true ? style.light : style.dark}>
        <div className={style.info}>
            <div><img src={pokemon.img} alt={pokemon.name}/></div>
            <div className={style.text}>
                <p className={style.name}>{pokemon.name}</p>
                <div className={style.forms}>
                    <p>Forms:</p>
                    <p>{pokemon.forms}</p></div>
            </div>

        </div>
        <div className={style.remove}><Button
            color={isLight === true ? "info" : "danger"}
            onClick={handleDelete}
            size="lg"
            variant="outlined"
        >❌</Button></div>
    </div>
}