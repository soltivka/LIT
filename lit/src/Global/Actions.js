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
const PUSH_FILTREDBYINDEX_TO_HANDOVERCASESLIST = 'PUSH_FILTREDBYINDEX_TO_HANDOVERCASESLIST';
const POST_ISDONE_CASES = 'POST_ISDONE_CASES';
const SET_FILTER_STITCHER = 'SET_FILTER_STITCHER';
const SET_FILTER_STITCHDATE='SET_FILTER_STITCHDATE';
const SET_FILTER_SCANER = 'SET_FILTER_SCANER';
const SET_FILTER_SCANERSTARTDATE = 'SET_FILTER_SCANERSTARTDATE';
const SET_FILTER_SCANERFINISHDATE = 'SET_FILTER_SCANERFINISHDATE';
const SET_FILTER_JOINTER = 'SET_FILTER_JOINTER';
const SET_FILTER_JOINTDATE = 'SET_FILTER_JOINTDATE';
const RESET_USERSTATS = 'RESET_USERSTATS';
const SET_FILTER_ISDONE='SET_FILTER_ISDONE';
const GET_PROJECT_STATS='GET_PROJECT_STATS';
const GET_USERSTATS = 'GET_USERSTATS';
const SWITCH_VIEW_MODE='SWITCH_VIEW_MODE';
const SET_NEWUSER_NAME='SET_NEWUSER_NAME';
const SET_NEWUSER_USERHASH='SET_NEWUSER_USERHASH';
const SET_NEWUSER_ID='SET_NEWUSER_ID';
const SET_NEWUSER_OPERATION='SET_NEWUSER_OPERATION';
const SET_NEWUSER_ISADMIN='SET_NEWUSER_ISADMIN';
const POST_NEWUSER='POST_NEWUSER';
const SET_USER_TODELETE='SET_USER_TODELETE';
const POST_USER_DELETE='POST_USER_DELETE';
const GET_CASEFROMSERVER='GET_CASEFROMSERVER';
const SET_CASETOGET='SET_CASETOGET';
const SET_HARDCHANGE_JOINTER='SET_HARDCHANGE_JOINTER';
const SET_HARDCHANGE_STITCHER='SET_HARDCHANGE_STITCHER';
const SET_HARDCHANGE_SCANER='SET_HARDCHANGE_SCANER';
const POST_HARDCHANGE='POST_HARDCHANGE';
const GET_USERSTATS2='GET_USERSTATS2';
const SWITCH_STATSOPERATION='SWITCH_STATSOPERATION';
const PROJECT_STATS_SET_PAGES_VISIBLE='PROJECT_STATS_SET_PAGES_VISIBLE';
const GET_USERSTATS_BYACTS = 'GET_USERSTATS_BYACTS';
const GET_DATA_FOR_DEMO = 'GET_DATA_FOR_DEMO'


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
export const set_filter_stitcher_action=(value)=>({
    type:SET_FILTER_STITCHER,
    value:value,
})
export const set_filter_stitchDate_action=(value)=>({
    type: SET_FILTER_STITCHDATE,
    value:value,
})
export const set_filter_scaner_action=(value)=>({
    type:SET_FILTER_SCANER,
    value:value,
})
export const set_filter_scanerStartDate_action = (value)=>({
    type: SET_FILTER_SCANERSTARTDATE,
    value:value,
})
export const set_filter_scanerFinishDate_action =(value)=>({
    type:SET_FILTER_SCANERFINISHDATE,
    value:value,
})
export const set_filter_jointer_action=(value)=>({
    type:SET_FILTER_JOINTER,
    value:value,
})
export const set_filter_jointDate_action=(value)=>({
    type:SET_FILTER_JOINTDATE,
    value:value,
})
export const set_filter_isDone_action=(value)=>({
    type: SET_FILTER_ISDONE,
    value:value,
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
export const push_filtredByIndex_to_handOverCasesList_action=()=>({
    type: PUSH_FILTREDBYINDEX_TO_HANDOVERCASESLIST,
})
export const post_done_cases_action=()=>({
    type:POST_ISDONE_CASES,
})
export const reset_userStats_action=()=>({
    type: RESET_USERSTATS,
})
export const get_projectStats_action=()=>({
   type: GET_PROJECT_STATS,
});
export const get_userStats_action=()=>({
    type: GET_USERSTATS,
})
export const get_userStatsByActs_action=()=>({
    type: GET_USERSTATS_BYACTS,
})
export const switchViewMode_action=(value)=>({
    type: SWITCH_VIEW_MODE,
    value: value,
})
export const set_newUser_name_action=(value)=>({
    type: SET_NEWUSER_NAME,
    value: value,

})
export const set_newUser_userhash_action=(value)=>({
    type: SET_NEWUSER_USERHASH,
    value:value,
})
export const set_newUser_id_action=(value)=>({
    type: SET_NEWUSER_ID,
    value:value,
})
export const set_newUser_operation_action=(value)=>({
    type: SET_NEWUSER_OPERATION,
    value: value,
})
export const set_newUser_isAdmin_action=(value)=>({
    type: SET_NEWUSER_ISADMIN,
    value:value,
})
export const post_newUser_action=()=>({
    type: POST_NEWUSER,
})
export const set_userToDelete_action=(value)=>({
    type: SET_USER_TODELETE,
    value: value
})
export const post_deleteUser_action=()=>({
    type: POST_USER_DELETE,
})
export const get_caseFromServer_action=()=>({
    type: GET_CASEFROMSERVER,
})
export const set_caseToGet_action=(value)=>({
    type: SET_CASETOGET,
    value:value,
})
export const set_hardChange_scaner_action=(value)=>({
    type: SET_HARDCHANGE_SCANER,
    value:value,
})
export const set_hardChange_stitcher_action=(value)=>({
    type: SET_HARDCHANGE_STITCHER,
    value:value,
})
export const set_hardChange_jointer_action=(value)=>({
    type: SET_HARDCHANGE_JOINTER,
    value:value,
})
export const post_hardChange_action=()=>({
    type: POST_HARDCHANGE,
})
export const get_userStats2_action=(value)=>({
    type: GET_USERSTATS2,
    value: value,
})
export const switchStatsOperation_action=(value)=>({
    type: SWITCH_STATSOPERATION,
    value: value
})
export const setPagesVisible_action=()=>({
    type: PROJECT_STATS_SET_PAGES_VISIBLE
})
export const getDataForDemo_action=()=>({
    type: GET_DATA_FOR_DEMO
})








