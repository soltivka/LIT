import React from 'react';
import './index.css';
import store from "./Global/redux-store.js";
import ReactDOM from "react-dom";
import * as serviceWorker from './serviceWorker';
import App from "./App";

const render = (state) => {
    ReactDOM.render(
        <React.StrictMode>
                <App state={state.main}
                     dispatch={store.dispatch.bind(store)}
                     key={"reactApp"}
                />
        </React.StrictMode>,
        document.getElementById('root')
    );
}
let state=store.getState();
render(state);
store.subscribe(()=>{render(store.getState())});


serviceWorker.unregister();