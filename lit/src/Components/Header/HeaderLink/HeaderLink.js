import React from 'react';
import s from './HeaderLink.module.css';
import {
    get_casesForSearch_action,
    get_projectStats_action,
    get_userStats_action,
    setCurrentNav_action
} from "../../../Global/Actions";



const HeaderLink = function (props) {
    let click = function () {
        props.dispatch(setCurrentNav_action(props.nav))
        if(props.nav==="search"||props.nav==="handOver"){
            props.dispatch(get_casesForSearch_action(props.state.userhash))
        }
        if(props.nav==="projectStats"){
            props.dispatch(get_projectStats_action(props.state.userhash))
        }
        if(props.nav==="userStats"){
            props.dispatch(get_userStats_action(props.state.userhash))
        }
    }
    const defineClass=function(){
        if(props.state.currentNav===props.nav){
            return(s.activeLink)
        }else return(s.headerButton)
    }


    return (
        <div className={s.buttonWrapper}>
            <button className={defineClass()}
                    onClick={click}>
                {props.text}
            </button>

        </div>
    );
}
export default HeaderLink