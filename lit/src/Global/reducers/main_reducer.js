import {database} from '../database'

const SET_CURRENT_NAV = 'SET_CURRENT_NAV';
const CHOOSE_CASE = 'CHOOSE_CASE';
const CANCEL_CHOOSE_CASE = 'CANCEL_CHOOSE_CASE';
const SET_OPERATOR = 'SET_OPERATOR';
const SET_ACT_FILTER='SET_ACT_FILTER';
const SET_CASE_FILTER='SET_CASE_FILTER';


const initialState = {
    database: database,
    currentNav: 'joint',
    operator:'',
    actFilter: '',
    caseFilter: '',
}


const main_reducer = function (state, action) {
    if (state) {
        switch (action.type) {
            case  CHOOSE_CASE:
                let element = state.database.find((el) => {
                    if (el.id === action.id) {
                        return true
                    } else return false
                })
                element.choosen = true;
                element.visible = false;
                break;

            case  CANCEL_CHOOSE_CASE:
                state.database[action.id].choosen = false;
                state.database[action.id].visible = true;
                break;


            case SET_CURRENT_NAV:
                state.currentNav = action.nav;
                break;

            case SET_OPERATOR:
                state.operator = action.value
                console.log(state);
                break;

            case SET_CASE_FILTER:
                console.log(state);
                state.caseFilter = action.value
                break;

            case SET_ACT_FILTER:
                state.actFilter = action.value
                console.log(state);
                break;
        }
        return state
    } else
        return initialState;
}

export default main_reducer;