const SET_CURRENT_NAV = 'SET_CURRENT_NAV';
const SET_USERHASH = 'SET_USERHASH';
const USERHASH_REQUEST = "USERHASH_REQUEST";
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

export const setCurrentNav_action = (button_nav) => ({
    type: SET_CURRENT_NAV,
    nav: button_nav,
})
export const set_userhash_action = (userhash) => ({
    type: SET_USERHASH,
    userhash: userhash,
})
export const userHash_request_action = () => ({
    type: USERHASH_REQUEST,
})
export const userHash_response_action = () => ({
    type: USERHASH_RESPONSE,
})
export const choose_case_action = (index) => ({
    type: CHOOSE_CASE,
    index: index,
})
export const unchoose_case_action = (index) => ({
    type: UNCHOOSE_CASE,
    index: index,
})
export const post_changes_action = () => ({
    type: POST_CHANGES,
})
export const set_scan_number_action = (index, value) => ({
    type: SET_SCAN_NUMBER,
    value: value,
    index: index,
})
export const set_scan_pages_action = (index, value) => ({
    type: SET_SCAN_PAGES,
    value: value,
    index: index,
})
export const set_filter_index_action = (value) => ({
    type: SET_FILTER_INDEX,
    value: value,
})
export const set_filter_adress_action = (value) => ({
    type: SET_FILTER_ADRESS,
    value: value,
})
export const set_filter_act_action = (value) => ({
    type: SET_FILTER_ACT,
    value: value,
})
export const set_filter_id_action = (value) => ({
    type: SET_FILTER_ID,
    value: value,
})
export const change_admin_operation_action=(value)=>({
    type: CHANGE_ADMIN_OPERATION,
    value:value,
})
export const set_date_day_action=(value)=>({
    type: SET_DATE_DAY,
    value:value,
})
export const get_casesForSearch_action=()=>({
    type: GET_CASESFORSEARCH,
});





