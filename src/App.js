
import style from './App.scss';
import {useContext} from "react";
import ThemeContext from "./context";
import {Switch} from "@mui/joy";
import PokemonApp from "./components/pokemons";
import Spin from "./loader";




function App() {
  const {isLight, changeTheme} = useContext(ThemeContext)


  return (
    <div className={isLight === true ? 'light' : 'dark'}>
        <Spin />
            <div className="header">
                <div className={'switcher'} >
                <div><Switch color={isLight === true ? 'primary' : "neutral"} variant={"soft"} size="lg" onClick={() => {changeTheme()}}/></div>
                </div>
            </div>
                <div className={'nameTheme'}>
                    {isLight === true ? "light" : "dark"}
                </div>
            <PokemonApp />

    </div>
  );
}

export default App;
