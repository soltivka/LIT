import React from 'react';
import s from './Input.module.css';
import {
    chooseCaseByEnter_action,
    setActFilter_action,
    setCaseFilter_action,
    setOperator_action
} from "../../Global/Actions";

const Input = function (props) {
    let onChange = function (event) {
        props.dispatch(chooseAction(event.target.value));
    }
    let handleEnter = (event) => {
        if(event.key === 'Enter'){
            console.log('enter press here! ')
            props.dispatch(chooseCaseByEnter_action())
        }
        if(event.key === ','){
            event.preventDefault();
        }
    }
    let chooseAction = (event_target_value) => {
        if (props.fieldType === 'operator') {
            return setOperator_action(event_target_value)
        }
        if (props.fieldType === 'actFilter') {
            return setActFilter_action(event_target_value)
        }
        if (props.fieldType === 'caseFilter') {
            return setCaseFilter_action(event_target_value)

        }

    }


    return (
        <div className={s.wrapper}>
            <input type={props.type}
                   value={props.field}
                   onChange={onChange}
                   className={s.input}
                   onKeyPress={handleEnter}/>
        </div>

    );
}
export default Input