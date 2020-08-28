import React from 'react';
import s from './HeaderLink.module.css';
import {NavLink} from "react-router-dom";
import {setCurrentNav_action} from "../../../Global/Actions";



const HeaderLink = function (props) {
 let click=function(){
     props.dispatch(setCurrentNav_action(props.nav))
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