import React from 'react';
import s from './HeaderLink.module.css';
import {setCurrentNav_action} from "../../../Global/Actions";
import {defineColor} from "../../../Global/Functions";


const HeaderLink = function (props) {
    let click = function () {
        props.dispatch(setCurrentNav_action(props.nav))
    }


    let style = function(){
        if (props.nav===props.state.main.currentNav){
            return ({borderBottom: 'solid 5px '+defineColor(props.state.main.currentNav)})
        }
        else return
    };
    return (
        <div className={s.buttonWrapper}>
            <button className={s.headerButton}
                    onClick={click}
                    style={style()}>
                {props.text}
            </button>

        </div>
    );
}
export default HeaderLink