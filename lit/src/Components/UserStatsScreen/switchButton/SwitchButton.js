import React from 'react';
import s from './SwitchButton.module.css';
import {switchViewMode_action} from "../../../Global/Actions";

const SwitchButton = function (props) {

const switchViewMode=function(){
    props.dispatch(switchViewMode_action(props.value))

}
const defineClass=function(){
    if(props.viewMode===props.value){return s.clicked}
    else{return s.active}
}


    return (
       <div className={defineClass()}
       onClick={switchViewMode}>
           {props.text}
       </div>
    )

}
export default SwitchButton