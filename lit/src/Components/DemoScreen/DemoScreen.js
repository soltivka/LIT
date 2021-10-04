import React from 'react';
import s from './DemoScreen.module.css';
import SwitchButton from "./switchButton/SwitchButton";
import {getCurrentMonth} from "../../Global/Functions";
import {getDataForDemo_action, setPagesVisible_action, switchStatsOperation_action} from "../../Global/Actions";


const DemoScreen = function (props) {
    let values =['stitcher','scaner','jointer']
    let refreshDemo=function (){
        props.dispatch(getDataForDemo_action(values[0]))
    }




    return (
        <div className={s.wrapper}>
            <button onClick={refreshDemo}> заказать данне</button>

        </div>
    )

}
export default DemoScreen