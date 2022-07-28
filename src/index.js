import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ThemeContext from "./context";
import { CssVarsProvider } from '@mui/joy/styles';
import {Provider} from "react-redux";
import {rootReducer} from "./redux/rootReducer";
import {createStore, compose, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import style from './index.module.scss'
import { save, load } from "redux-localstorage-simple"
const  createStoreWithMiddleware
    = compose(applyMiddleware(thunk, save()))( createStore )

//const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
const store = createStoreWithMiddleware(
    rootReducer,
    load()
)
function Main() {
    const [isLight, setIsLight] = useState(true);

    function changeTheme() {
        if (isLight) {
            setIsLight(false);
        } else setIsLight(true);
    }
    return (
        <div className={isLight === true ? style.light : style.dark}>
        <React.StrictMode>
            <CssVarsProvider>
               <Provider store={store} >
                   <ThemeContext.Provider value={{isLight, changeTheme}}>
                       <App />
                   </ThemeContext.Provider>
               </Provider>
            </CssVarsProvider>
        </React.StrictMode>
        </div>
    )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Main />
);
