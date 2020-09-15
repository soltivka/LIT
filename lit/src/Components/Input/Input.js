import React from 'react';
import s from './Input.module.css';
import CancelButton from "../CancelButton/CancelButton";
import {setOperator_action} from "../../Global/Actions";

const Input = function (props) {
    let onChange = function(event){
        props.dispatch(setOperator_action(event.target.value))

    }





    return (
        <div className={s.wrapper}>
            <input type={props.type}
                   value={props.field}
            onChange={onChange}
            className={s.input}/>
        </div>

    );
}
export default Input