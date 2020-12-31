import React from 'react';
import s from './SwitchButton.module.css';
import {switchStatsOperation_action, switchViewMode_action} from "../../../Global/Actions";

const SwitchButton = function (props) {

const clickSwitchButton=function(){
    if(props.field==="view mode"){
        props.dispatch(switchViewMode_action(props.value))
    }else if(props.field==="statsOperation"){
        props.dispatch(switchStatsOperation_action(props.value))
    }

}
const defineClass=function(){
    if(props.viewMode===props.value){return s.clicked}
    else{return s.active}
}


    return (
       <div className={defineClass()}
       onClick={clickSwitchButton}>
           {props.text}
       </div>
    )

}
export default SwitchButton