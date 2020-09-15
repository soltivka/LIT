import {database} from '../database'

const SET_CURRENT_NAV = 'SET_CURRENT_NAV';
const CHOOSE_CASE = 'CHOOSE_CASE';
const CANCEL_CHOOSE_CASE = 'CANCEL_CHOOSE_CASE';
const SET_OPERATOR='SET_OPERATOR'


const initialState = {
    database: database,
    currentNav: 'joint',
    choosen: [],
    operator: 0,
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
                state.operator = action.operator;
                console.log(state.operator)
                break;
        }
        return state
    } else
        return initialState;
}

export default main_reducer;