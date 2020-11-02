const SET_CURRENT_NAV = 'SET_CURRENT_NAV';
const SET_USERHASH='SET_USERHASH';
const USERHASH_REQUEST="USERHASH_REQUEST";
const USERHASH_RESPONSE='USERHASH_RESPONSE';
const CHOOSE_CASE='CHOOSE_CASE';
const POST_CHANGES='POST_CHANGES';

export const setCurrentNav_action = (button_nav) => (
    {
        type: SET_CURRENT_NAV,
        nav: button_nav,
    }
)

export const set_userhash_action=(userhash)=>({
    type:SET_USERHASH,
    userhash:userhash,
})
export const userHash_request_action=(userhash)=>({
    type:USERHASH_REQUEST,
    userhash:userhash,
})
export const userHash_response_action=()=>({
    type: USERHASH_RESPONSE,
})
export const choose_case_action=(index)=>({
    type:  CHOOSE_CASE,
    index:index,
})
export const post_changes_action=()=>({
        type:POST_CHANGES,
    })




