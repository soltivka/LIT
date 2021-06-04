import React from 'react';
import s from './HeaderLink.module.css';
import {
    get_casesForSearch_action,
    get_projectStats_action,
    get_userStats_action, get_userStatsByActs_action,
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
        if(props.nav==="userStatsByActs"){
            props.dispatch(get_userStatsByActs_action(props.state.userhash))
        }
    }
    const defineClass=function(){
        let curClass='';
        if(props.state.currentNav===props.nav){
            curClass+=' '+s.activeLink
        }else curClass+=' '+s.headerButton
        if(props.onlyAdmin===true&&props.state.userInfo.isAdmin!==true){
            curClass+=' '+s.invisible
        }
        return curClass
    }


    return (
        <div className={s.buttonWrapper}>
            <button className={defineClass()}
                    onClick={click}>
                <b>{props.text}</b>
            </button>

        </div>
    );
}
export default HeaderLink