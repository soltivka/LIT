import {database} from '../database'

const CHANGE_TRANSACTION_VIEW = 'CHANGE_TRANSACTION_VIEW';
const SET_CURRENT_NAV = 'SET_CURRENT_NAV';


const initialState = {
    database: database,
    currentNav: 'stitch',
}


const main_reducer = function (state, action) {
    if (state) {
        switch (action.type) {
            case CHANGE_TRANSACTION_VIEW:
                state.colors.red = "rgba(209, 255, 209,1)";
                break;

            case SET_CURRENT_NAV:
                state.currentNav = action.nav;
                break;
        }
        return state
    } else
        return initialState;
}

export default main_reducer;