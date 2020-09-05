import {database} from '../database'

const CHANGE_TRANSACTION_VIEW = 'CHANGE_TRANSACTION_VIEW';
const SET_CURRENT_NAV = 'SET_CURRENT_NAV';


const initialState = {
    database: database,
    currentNav: 'stitch',
    choosen:[{
        id:0,
        act:15,
        number:103,
        adress: 'some adress here',
        incomeDate: '10.08.20',
        outDate:'' ,
        jointDate:'',
        jointer:0,
        scanDate:'',
        scaner:0,
        pages:0,
        stitchDate:'',
        stitcher:0,

    },]
}


const main_reducer = function (state, action) {
    if (state) {
        switch (action.type) {
            case CHANGE_TRANSACTION_VIEW:
                state.colors.red = "rgba(209, 255, 209,1)";
                break;

            case SET_CURRENT_NAV:
                state.currentNav = action.nav;
                break;
        }
        return state
    } else
        return initialState;
}

export default main_reducer;