import style from './search.module.scss'
import {useContext, useEffect} from "react";
import ThemeContext from "../../../context";
import {useDispatch, useSelector} from "react-redux";
import {addSearchPokemon, inputSearch, searchPokemon} from "../../../redux/actions";



export default function Search() {
    const {isLight} = useContext(ThemeContext)
    const text = useSelector(state => {
        const {search} = state;
        return search.text
    })
    const dispatch = useDispatch();
    const res = useSelector(state=>{
        const {list} = state;
        return list.findPokemon
    })
    useEffect(()=>{
     if (res.url !== undefined) {
         if (res.repeat === false) {
             if (res.res === true) {
                 dispatch(addSearchPokemon(res.url))
             }
         }
     }
    },[res])
    const HandlerSubmit = e => {
        e.preventDefault();
        dispatch(searchPokemon(text));
        dispatch(inputSearch(''));
    }

    const onChangeHandle = (e) => {
        dispatch(inputSearch(e.target.value))
    }


    return (
        <div className={isLight===true ? style.light : style.dark}>
        <div className={style.input}>
            <form onSubmit={HandlerSubmit}>
                <input value={text} className={style.field} onChange={onChangeHandle}/>
            </form>
        </div>
            {res.repeat ? <div className={style.error}>Такой покемон уже есть в коллекции</div> : ''}
            {!res.res ? <div className={style.error}>Такого покемона не существует</div>: ''}
        </div>
    )
};