const SET_CURRENT_NAV = 'SET_CURRENT_NAV';
const CHOOSE_CASE = 'CHOOSE_CASE';
const CANCEL_CHOOSE_CASE = 'CANCEL_CHOOSE_CASE';
const SET_OPERATOR = 'SET_OPERATOR';
const SET_CASE_FILTER = 'SET_CASE_FILTER';
const SET_ACT_FILTER = 'SET_ACT_FILTER';
const TRANSFER_CASES ='TRANSFER_CASES';
const CHOOSE_CASE_BY_ENTER='CHOOSE_CASE_BY_ENTER';
const SET_SCAN_INDEX='SET_SCAN_INDEX';
const SET_PAGES='SET_PAGES';
const GET_DATA='GET_DATA';

export const setCurrentNav_action = (button_nav) => (
    {
        type: SET_CURRENT_NAV,
        nav: button_nav,
    }
)

export const chooseCase_action = (id) => (
    {
        type: CHOOSE_CASE,
        id: id
    }
)
export const cancelChooseCase_action = (id) => (
    {
        type: CANCEL_CHOOSE_CASE,
        id: id
    }
)
export const setOperator_action = (value) => (
    {
        type: SET_OPERATOR,
        value: value,
    }
)
export const setCaseFilter_action = (value) => (
    {
        type: SET_CASE_FILTER,
        value: value,
    }
)
export const setActFilter_action = (value) => (
    {
        type: SET_ACT_FILTER,
        value: value,
    }
)
export const transferCases_action = () => ({
    type: TRANSFER_CASES
})
export const chooseCaseByEnter_action=()=>(
    {
        type: CHOOSE_CASE_BY_ENTER
    }
)
export const setScanIndex_action=(value,id)=>({
    type:SET_SCAN_INDEX,
    value:value,
    id:id,
})
export const setPages_action=(value,id)=>({
    type:SET_PAGES,
    value:value,
    id:id,
})







