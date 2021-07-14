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
    let classString = ''
    if(props.viewMode===props.value||props.statsOperation===props.value){classString+= s.clicked}
    else{classString+= s.active}

    if(props.statsOperation==="stitcher"){classString+=' '+s.stitchColor}
    if(props.statsOperation==="scaner"){classString+=' '+s.scaner}
    if(props.statsOperation==="jointer"){classString+=' '+s.jointer}
    return classString
}


    return (
       <div className={defineClass()}
       onClick={clickSwitchButton}>
           {props.text}
       </div>
    )

}
export default SwitchButton