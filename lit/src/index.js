import React from 'react';
import './index.css';
import store from "./Global/redux-store.js";
import ReactDOM from "react-dom";
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import App from "./App";

const render = (state) => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App state={state}
                     dispatch={store.dispatch.bind(store)}
                />
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
let state=store.getState();
render(state);
store.subscribe(()=>{render(store.getState())});


serviceWorker.unregister();