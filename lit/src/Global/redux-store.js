import {combineReducers, createStore} from "redux";
import main_reducer from "./reducers/main_reducer";

let reducers = combineReducers({
    main: main_reducer,
});

let store = createStore(reducers);

export default store;