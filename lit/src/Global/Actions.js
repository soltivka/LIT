const SET_CURRENT_NAV = 'SET_CURRENT_NAV';
const CHOOSE_CASE = 'CHOOSE_CASE';
const CANCEL_CHOOSE_CASE = 'CANCEL_CHOOSE_CASE';
const SET_OPERATOR='SET_OPERATOR';
const SET_CASE_FILTER='SET_CASE_FILTER';
const SET_ACT_FILTER = 'SET_ACT_FILTER';

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
export const setOperator_action=(value)=>(
    {
        type:SET_OPERATOR,
        value:value,
    }
)
export const setCaseFilter_action=(value)=>(
    {
        type:SET_CASE_FILTER,
        value:value,
    }
)
export const setActFilter_action=(value)=>(
    {
        type:SET_ACT_FILTER,
        value:value,
    }
)





