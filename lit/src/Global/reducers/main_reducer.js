import {post_case_changes, request_operator_cases} from "../Functions";
import {userHash_response_action} from "../Actions";
import store from "../redux-store";

const SET_CURRENT_NAV = 'SET_CURRENT_NAV';
const SET_USERHASH = 'SET_USERHASH';
const USERHASH_REQUEST = 'USERHASH_REQUEST';
const USERHASH_RESPONSE = 'USERHASH_RESPONSE';
const CHOOSE_CASE = 'CHOOSE_CASE';
const POST_CHANGES = 'POST_CHANGES';
const UNCHOOSE_CASE = 'UNCHOOSE_CASE';
const SET_SCAN_NUMBER = 'SET_SCAN_NUMBER';
const SET_SCAN_PAGES = 'SET_SCAN_PAGES';
const SET_FILTER_INDEX='SET_FILTER_INDEX';
const SET_FILTER_ADRESS='SET_FILTER_ADRESS';


const initialState = {
    operator_cases: {
        isFetching: false,
        data: [],
    },
    choosen_cases: [],
    filters:{
        index:'',
        adress:'',
    },

    currentNav: 'auth',
    user: '',
    userhash: '',
    userInfo: {},
}


const main_reducer = function (state, action) {
    if (state) {
        switch (action.type) {

            case SET_CURRENT_NAV:
                state.currentNav = action.nav;  //change nav
                break;

            case SET_USERHASH:
                state.userhash = action.userhash                 //set user-hash from first-screen input
                break;

            case USERHASH_REQUEST:
                state.currentNav = "work";                                                  // request start data from server
                state.operator_cases.isFetching = true;
                request_operator_cases(state.userhash).then((data) => {
                    state.userInfo = data.userInfo
                    state.operator_cases.data = data.casesForUser.map((el) => {
                        el.choosen = false
                        return el
                    });
                    store.dispatch(userHash_response_action())
                });
                break;

            case USERHASH_RESPONSE:
                state.operator_cases.isFetching = false
                break;

            case CHOOSE_CASE:                                                               // отобрать дело
                state.operator_cases.data.map((el) => {
                    if (el.index === action.index) {
                        state.choosen_cases.push(el);
                        el.choosen = true
                    }
                })
                console.log(state.choosen_cases)
                break;

            case UNCHOOSE_CASE:                                                             // отменить выбранное дело.
                state.operator_cases.data.map((el) => {
                    if (el.index === action.index) {
                        el.choosen = false
                    }
                })
                state.choosen_cases = state.choosen_cases.filter((el) => el.index !== action.index);
                console.log(state.choosen_cases)
                break;

            case SET_FILTER_INDEX:                                                                  //фильтры
                state.filters.index=action.value
                break;

            case SET_FILTER_ADRESS:
                state.filters.adress=action.value
                break;

            case SET_SCAN_NUMBER:                                                               // вписать сканировочный индекс в дело
                state.operator_cases.data.map((el) => {
                    if (el.index === action.index) {
                        el.scanNumber = action.value
                    }
                })
                break;

            case SET_SCAN_PAGES:                                                           //вписать количество страниц в дело
                state.operator_cases.data.map((el) => {
                    if (el.index === action.index) {
                        el.pages = action.value
                    }
                })
                break;


            case POST_CHANGES:                                                                //передать список отобраных дел на сервер
                state.operator_cases.isFetching = true;
                state.operator_cases.data = [];
                post_case_changes(state.userhash, state.choosen_cases).then((data) => {
                    if (data.casesForUser) {
                        state.operator_cases.data = data.casesForUser.map((el) => {
                            el.choosen = false
                            return el
                        });
                        state.choosen_cases=[];
                    }
                    store.dispatch(userHash_response_action())
                });
                break;


        }
        return state
    } else
        return initialState;
}

export default main_reducer;