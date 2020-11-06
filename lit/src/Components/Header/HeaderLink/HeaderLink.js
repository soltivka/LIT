import React from 'react';
import s from './HeaderLink.module.css';
import {get_casesForSearch_action, setCurrentNav_action} from "../../../Global/Actions";



const HeaderLink = function (props) {
    let click = function () {
        props.dispatch(setCurrentNav_action(props.nav))
        if(props.nav==="search"){
            props.dispatch(get_casesForSearch_action(props.state.userhash))
            console.log(click);
            console.log(props.state.casesForSearch);
        }
    }


    return (
        <div className={s.buttonWrapper}>
            <button className={s.headerButton}
                    onClick={click}>
                {props.text}
            </button>

        </div>
    );
}
export default HeaderLink