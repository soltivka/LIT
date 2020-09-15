import React from 'react';
import s from './ChooseButton.module.css';
import {chooseCase_action, setCurrentNav_action} from "../../Global/Actions";

const ChooseButton = function (props) {
 let click=function(){
     props.dispatch(chooseCase_action(props.id))
 }

    return (
        <div className={s.wrapper}>
            <button className={s.button}
            onClick={click}><h1>+</h1></button>

        </div>

    );
}
export default ChooseButton