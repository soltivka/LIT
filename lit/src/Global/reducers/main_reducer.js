import {
    change_admin_operation,
    dayJoiner,
    post_case_changes, request_casesForSearch,
    request_operator_cases,
    setDateToChoosen
} from "../Functions";
import {userHash_response_action} from "../Actions";
import store from "../redux-store";
import moment from 'moment';

const SET_CURRENT_NAV = 'SET_CURRENT_NAV';
const SET_USERHASH = 'SET_USERHASH';
const USERHASH_REQUEST = 'USERHASH_REQUEST';
const USERHASH_RESPONSE = 'USERHASH_RESPONSE';
const CHOOSE_CASE = 'CHOOSE_CASE';
const POST_CHANGES = 'POST_CHANGES';
const UNCHOOSE_CASE = 'UNCHOOSE_CASE';
const SET_SCAN_NUMBER = 'SET_SCAN_NUMBER';
const SET_SCAN_PAGES = 'SET_SCAN_PAGES';
const SET_FILTER_INDEX = 'SET_FILTER_INDEX';
const SET_FILTER_ADRESS = 'SET_FILTER_ADRESS';
const SET_FILTER_ACT = 'SET_FILTER_ACT';
const SET_FILTER_ID = 'SET_FILTER_ID';
const CHANGE_ADMIN_OPERATION = 'CHANGE_ADMIN_OPERATION';
const SET_DATE_DAY = 'SET_DATE_DAY';
const GET_CASESFORSEARCH='GET_CASESFORSEARCH';


const initialState = {
    operator_cases: {
        isFetching: false,
        data: [],
    },
    casesForSearch:{
        isFetching: false,
        data:[],
    },
    date: '',
    choosen_cases: [],
    filters: {
        index: '',
        adress: '',
        act: '',
        id: '',
    },

    currentNav: 'auth',
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
                state.casesForSearch.isFetching=false
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
                state.filters.index = action.value
                break;

            case SET_FILTER_ADRESS:
                state.filters.adress = action.value
                break;
            case SET_FILTER_ACT:
                state.filters.act = action.value
                break;
            case SET_FILTER_ID:
                state.filters.id = action.value
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

            case SET_DATE_DAY:
                if(action.value!==''){
                    let date = moment().date(action.value).format("MMM Do YY");
                    state.date=date;
                }else{state.date=''}
                console.log(state.date);
                break;


            case POST_CHANGES:                                                                //передать список отобраных дел на сервер
                setDateToChoosen(state.choosen_cases,
                    state.userInfo["operation"],
                    state.date)
                console.log(state.choosen_cases)

                state.operator_cases.isFetching = true;
                state.operator_cases.data = [];
                post_case_changes(state.userhash, state.choosen_cases).then((data) => {
                    if (data.casesForUser) {
                        state.operator_cases.data = data.casesForUser.map((el) => {
                            el.choosen = false
                            return el
                        });
                        state.choosen_cases = [];
                    }
                    state.userInfo = data.userInfo;
                    store.dispatch(userHash_response_action())
                });
                break;


            case CHANGE_ADMIN_OPERATION:
                change_admin_operation(state.userhash, action.value).then((data) => {
                    if (data.casesForUser) {
                        state.operator_cases.data = data.casesForUser.map((el) => {
                            el.choosen = false
                            return el
                        });
                        state.choosen_cases = [];
                    }
                    state.userInfo = data.userInfo;
                    store.dispatch(userHash_response_action())
                });
                break;

            case GET_CASESFORSEARCH:                                                // request start data from server
                state.casesForSearch.isFetching = true;
                request_casesForSearch(state.userhash).then((data) => {
                    state.casesForSearch.data = data.casesForSearch
                    store.dispatch(userHash_response_action())
                });

                break;


        }
        return state
    } else
        return initialState;
}

export default main_reducer;