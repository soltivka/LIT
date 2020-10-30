import {database} from '../database'
import {applyFilters, getData, requestData} from "../Functions";

const SET_CURRENT_NAV = 'SET_CURRENT_NAV';
const CHOOSE_CASE = 'CHOOSE_CASE';
const CANCEL_CHOOSE_CASE = 'CANCEL_CHOOSE_CASE';
const SET_OPERATOR = 'SET_OPERATOR';
const SET_ACT_FILTER = 'SET_ACT_FILTER';
const SET_CASE_FILTER = 'SET_CASE_FILTER';
const CHOOSE_CASE_BY_ENTER = 'CHOOSE_CASE_BY_ENTER';
const TRANSFER_CASES = 'TRANSFER_CASES';
const SET_SCAN_INDEX = 'SET_SCAN_INDEX';
const SET_PAGES='SET_PAGES';
const SET_USERHASH='SET_USERHASH';
const USERHASH_REQUEST='USERHASH_REQUEST';


const initialState = {
    database: [],
    currentNav: 'auth',
    operator: '',
    actFilter: '',
    caseFilter: '',
    user:'',
    userhash:'',
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
                state.currentNav = action.nav;  //change nav
                state.database.map((el) => {   //clear choosen field
                    el.choosen = false
                    el.visible = true
                })
                break;

            case SET_OPERATOR:
                state.operator = action.value
                break;

            case SET_CASE_FILTER:
                state.caseFilter = action.value
                break;

            case SET_ACT_FILTER:
                state.actFilter = action.value
                break;

            case CHOOSE_CASE_BY_ENTER:
                if (state.caseFilter !== '') {
                    let filtred = state.database.find((el) => {
                        if (el.visible === true) {
                            return applyFilters(el, state);
                        }
                    })
                    filtred.choosen = true;
                    filtred.visible = false;
                    state.caseFilter = '';
                }


                break;

            case TRANSFER_CASES:
                state.database.map((el) => {
                    // проверка выбранных дел и заполненности поля оператора
                    if (el.choosen === true && state.operator !== '') {

                        //отобрать необходимое поле оператора и заполнить. очистить отобранное
                        if (state.currentNav === 'joint') {
                            el.jointer = state.operator
                            el.choosen = false

                        }
                        if (state.currentNav === 'scan') {
                            el.scaner = state.operator
                            el.choosen = false
                        }
                        if (state.currentNav === 'stitch') {
                            el.stitcher = state.operator
                            el.choosen = false
                        }
                    }
                })
                break;

            case SET_SCAN_INDEX:
                let elem=state.database.find((el)=>{return (el.id===action.id)});
                elem.scanIndex=action.value;
                break;

            case SET_PAGES:
                let ele=state.database.find((el)=>{return (el.id===action.id)});
                ele.pages=action.value;
                break;

            case SET_USERHASH:
                state.userhash=action.userhash
                break;
            case USERHASH_REQUEST:
                let requestedData = requestData(state.userhash);
                console.log(requestedData)




        }
        return state
    } else
        return initialState;
}

export default main_reducer;