const SET_CURRENT_NAV = 'SET_CURRENT_NAV';
const CHOOSE_CASE = 'CHOOSE_CASE';
const CANCEL_CHOOSE_CASE = 'CANCEL_CHOOSE_CASE';

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





