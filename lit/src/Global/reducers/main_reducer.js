
import {post_case_changes, request_operator_cases} from "../Functions";
import {userHash_response_action} from "../Actions";
import store from "../redux-store";

const SET_CURRENT_NAV = 'SET_CURRENT_NAV';

const SET_USERHASH='SET_USERHASH';
const USERHASH_REQUEST='USERHASH_REQUEST';
const USERHASH_RESPONSE='USERHASH_RESPONSE';
const CHOOSE_CASE = 'CHOOSE_CASE';
const POST_CHANGES='POST_CHANGES';


const initialState = {
    operator_cases:{
        isFetching:false,
        data:[],
    },
    choosen_cases:[],

    currentNav: 'auth',
    user: '',
    userhash:'',
    userInfo:'',
}


const main_reducer = function (state, action) {
    if (state) {
        switch (action.type) {

            case SET_CURRENT_NAV:
                state.currentNav = action.nav;  //change nav
                break;

            case SET_USERHASH:
                state.userhash=action.userhash                 //set user-hash from first-screen input
                break;

            case USERHASH_REQUEST:
                state.currentNav = "work";                        // request start data from server
                state.operator_cases.isFetching=true;
                request_operator_cases(state.userhash).then((data)=>{
                    state.userInfo=data.userInfo
                    state.operator_cases.data = data.casesForUser.map((el)=>{
                        el.choosen=false
                        return el
                    });
                    store.dispatch(userHash_response_action())
                });
                break;
            case USERHASH_RESPONSE:
                state.operator_cases.isFetching=false
                break;

            case CHOOSE_CASE:                                       // отобрать дело
                state.operator_cases.data.map((el)=>{
                    if(el.index===action.index){
                        state.choosen_cases.push(el);
                        el.choosen=true
                    }
                })
                break;

            case POST_CHANGES:
                console.log(state.choosen_cases)          //передать список отобраных дел на сервер
                post_case_changes(state.userhash, state.choosen_cases).then(()=>{

                })

                break;



        }
        return state
    } else
        return initialState;
}

export default main_reducer;