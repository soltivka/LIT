import {
    change_admin_operation,
    dayJoiner, deleteUser, getCaseFromServer, getOperationStats,
    post_case_changes, post_done_cases, post_new_user, postHardChange, request_casesForSearch,
    request_operator_cases, request_projectStats, request_userStats, request_userStatsByActs, reset_userstats,
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
const GET_CASESFORSEARCH = 'GET_CASESFORSEARCH';
const PUSH_FILTREDBYINDEX_TO_HANDOVERCASESLIST = 'PUSH_FILTREDBYINDEX_TO_HANDOVERCASESLIST';
const POST_ISDONE_CASES = 'POST_ISDONE_CASES';
const SET_FILTER_STITCHER = 'SET_FILTER_STITCHER';
const SET_FILTER_STITCHDATE='SET_FILTER_STITCHDATE';
const RESET_USERSTATS = 'RESET_USERSTATS';
const SET_FILTER_SCANER = 'SET_FILTER_SCANER';
const SET_FILTER_SCANERSTARTDATE = 'SET_FILTER_SCANERSTARTDATE';
const SET_FILTER_SCANERFINISHDATE = 'SET_FILTER_SCANERFINISHDATE';
const SET_FILTER_JOINTER = 'SET_FILTER_JOINTER';
const SET_FILTER_JOINTDATE = 'SET_FILTER_JOINTDATE';
const SET_FILTER_ISDONE = 'SET_FILTER_ISDONE';
const GET_PROJECT_STATS = 'GET_PROJECT_STATS';
const GET_USERSTATS = 'GET_USERSTATS';
const SWITCH_VIEW_MODE = 'SWITCH_VIEW_MODE';
const SET_NEWUSER_NAME = 'SET_NEWUSER_NAME';
const SET_NEWUSER_USERHASH = 'SET_NEWUSER_USERHASH';
const SET_NEWUSER_ID = 'SET_NEWUSER_ID';
const SET_NEWUSER_OPERATION = 'SET_NEWUSER_OPERATION';
const SET_NEWUSER_ISADMIN = 'SET_NEWUSER_ISADMIN';
const POST_NEWUSER = 'POST_NEWUSER';
const SET_USER_TODELETE = 'SET_USER_TODELETE';
const POST_USER_DELETE = 'POST_USER_DELETE';
const SET_CASETOGET = 'SET_CASETOGET';
const GET_CASEFROMSERVER = 'GET_CASEFROMSERVER';
const SET_HARDCHANGE_JOINTER = 'SET_HARDCHANGE_JOINTER';
const SET_HARDCHANGE_STITCHER = 'SET_HARDCHANGE_STITCHER';
const SET_HARDCHANGE_SCANER = 'SET_HARDCHANGE_SCANER';
const POST_HARDCHANGE = 'POST_HARDCHANGE';
const SWITCH_STATSOPERATION="SWITCH_STATSOPERATION";
const PROJECT_STATS_SET_PAGES_VISIBLE="PROJECT_STATS_SET_PAGES_VISIBLE";
const GET_USERSTATS_BYACTS='GET_USERSTATS_BYACTS';// не используется
const GET_DATA_FOR_DEMO='GET_DATA_FOR_DEMO'

const initialState = {
    operator_cases: {
        isFetching: false,
        data: [],
    },
    casesForSearch: {
        isFetching: false,
        data: [],
    },
    casesForHandOver: [],
    date: '',
    choosen_cases: [],
    filters: {
        index: '',
        adress: '',
        act: '',
        id: '',
        stitcher: '',
        stitchDate:'',
        scaner: '',
        scanerDateStart:'',
        scanerDateFinish:'',
        jointer: '',
        jointDate:'',
        isDone: '',
    },
    projectStats: {},
    viewMode: 'total',
    statsOperation:'stitcher',

    currentNav: 'auth',
    userhash: '',
    userInfo: {
        isAdmin: false,
    },
    newUser: {
        id: '',
        userhash: '',
        name: '',
        operation: 'jointer',
        isAdmin: false,
    },
    userToDelete: '',
    dateUsersStats:{},
    hardChangeToCase: {
        id: '',
        index: '',
        act: '',
        street: '',
        adress: '',
        incomeDate: '',
        expectedPages: '',

        stitchDate: '',
        stitcher: '',

        scanDateStart: '',
        scanDateFinish: '',
        scaner: '',
        pages: '',
        scanNumber: '',

        jointDate: '',
        jointer: '',

        comment: '',
        isDone: '',
        isDoneDate: ''
    },
    projectStats_pagesVisible:false,

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
                state.casesForSearch.isFetching = false
                break;

            case CHOOSE_CASE:                                                               // отобрать дело
                state.operator_cases.data.map((el) => {
                    if (el.index === action.index) {
                        let choosenIsExist = state.choosen_cases.find((choosen_el) => {
                            return choosen_el.index === el.index
                        })
                        if (!choosenIsExist) {
                            state.choosen_cases.push(el);
                            el.choosen = true
                            state.filters.index = '';
                        } else {
                            alert("Нельзя выбрать одно дело дважды")
                        }

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
            case SET_FILTER_STITCHER:
                state.filters.stitcher = action.value
                break;
            case SET_FILTER_STITCHDATE:
                state.filters.stitchDate=action.value
                break;
            case SET_FILTER_SCANER:
                state.filters.scaner = action.value
                break;
            case SET_FILTER_SCANERSTARTDATE:
                state.filters.scanerDateStart = action.value
                break;
            case SET_FILTER_SCANERFINISHDATE:
                state.filters.scanerDateFinish = action.value
                break;
            case SET_FILTER_JOINTER:
                state.filters.jointer = action.value
                break;
            case SET_FILTER_JOINTDATE:
                state.filters.jointDate = action.value
                break;
            case SET_FILTER_ISDONE:
                state.filters.isDone = action.value
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
                if (action.value.length < 6) {
                    if (action.value !== '') {
                        let split = action.value.split('.')
                        let day = split[0];
                        let date = moment().date(day)
                        if (split[1]) {
                            console.log(split[1])
                            date.month(Number(split[1]) - 1)
                        }
                        date = date.format("MMM Do YY");
                        console.log(date)
                        state.date = date;
                    } else {
                        state.date = ''
                    }
                }
                break;


            case POST_CHANGES:                                                                //передать список отобраных дел на сервер
                setDateToChoosen(state.choosen_cases,
                    state.userInfo["operation"],
                    state.date);

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
            case PUSH_FILTREDBYINDEX_TO_HANDOVERCASESLIST:
                state.casesForSearch.data.map((el) => {
                    if (el.index === state.filters.index) {
                        let choosenIsExist = state.casesForHandOver.find((existCase) => {
                            return existCase.index === state.filters.index
                        })
                        if (!choosenIsExist) {
                            state.casesForHandOver.push(el)
                            state.filters.index = '';
                        } else {
                            alert("нельзя добавить в список дважды")
                        }

                    }
                })
                console.log(state.casesForHandOver)


                break;

            case POST_ISDONE_CASES:
                state.casesForSearch.isFetching = true;
                post_done_cases(state.userhash, state.casesForHandOver).then((data) => {
                    if (data.wrongCaseList) {
                        state.casesForHandOver = [];
                        data.wrongCaseList.forEach((el) => {
                            state.casesForHandOver.push(el);
                        })
                    }
                    state.userInfo = data.userInfo;
                    store.dispatch(userHash_response_action())
                });
                console.log("post isDone_cases");
                break;

            case RESET_USERSTATS:
                reset_userstats(state.userhash).then((data) => {
                    alert(data[0])
                })
                break;

            case GET_PROJECT_STATS:
                request_projectStats(state.userhash).then((data) => {
                    state.projectStats = data;


                    store.dispatch(userHash_response_action())
                })
                break;
            case GET_USERSTATS:
                request_userStats(state.userhash).then((data) => {
                    state.usersStats = data;
                    store.dispatch(userHash_response_action())
                })
                break;
            case GET_USERSTATS_BYACTS:
                request_userStatsByActs(state.userhash).then((data)=>{
                    state.userStatsByActs=data
                    alert(data);
                    store.dispatch(userHash_response_action())
                })

            case SWITCH_VIEW_MODE:
                state.viewMode = action.value
                break;

            case SET_NEWUSER_NAME:
                state.newUser.name = action.value
                break;

            case SET_NEWUSER_USERHASH:
                state.newUser.userhash = action.value
                break;

            case SET_NEWUSER_ID:
                state.newUser.id = action.value
                break;

            case SET_NEWUSER_OPERATION:
                state.newUser.operation = action.value;
                break;

            case SET_NEWUSER_ISADMIN:
                if (action.value === 'true') {
                    state.newUser.isAdmin = true
                } else if (action.value === 'false') {
                    state.newUser.isAdmin = false
                } else {
                    alert("troubles with set_newUser_isAdmin in reducer")
                }
                break;

            case POST_NEWUSER:
                post_new_user(state.userhash, state.newUser)
                state.newUser.name = '';
                state.newUser.id = '';
                state.newUser.userhash = '';
                break;

            case SET_USER_TODELETE:
                state.userToDelete = action.value;
                break;

            case POST_USER_DELETE:
                deleteUser(state.userhash, state.userToDelete);
                state.userToDelete = '';
                break;

            case SET_CASETOGET:
                state.hardChangeToCase.id = action.value
                console.log(state.hardChangeToCase);
                break;

            case GET_CASEFROMSERVER:
                getCaseFromServer(state.userhash, state.hardChangeToCase.id).then((requestedCase) => {
                        state.hardChangeToCase = requestedCase
                        store.dispatch(userHash_response_action())

                    }
                )
                break;

            case  SET_HARDCHANGE_JOINTER:
                state.hardChangeToCase.jointer = action.value
                console.log(state.hardChangeToCase.jointer)
                break;

            case SET_HARDCHANGE_STITCHER:
                state.hardChangeToCase.stitcher = action.value
                console.log(state.hardChangeToCase.stitcher)
                break;

            case SET_HARDCHANGE_SCANER:
                state.hardChangeToCase.scaner = action.value
                console.log(state.hardChangeToCase.scaner)
                break;

            case POST_HARDCHANGE:
                postHardChange(state.userhash, state.hardChangeToCase)
                break;

            case SWITCH_STATSOPERATION:
                state.statsOperation=action.value;
                getOperationStats(state.userhash,state.statsOperation).then((data)=>{
                   state.dateUsersStats=data;
                    store.dispatch(userHash_response_action())
                })
                break;
            case PROJECT_STATS_SET_PAGES_VISIBLE:
                state.projectStats_pagesVisible=!state.projectStats_pagesVisible
                console.log(state.projectStats_pagesVisible)
                break;

            case GET_DATA_FOR_DEMO:
                break;

        }
        return state
    } else
        return initialState;
}

export default main_reducer;