import React from 'react';
import s from './InputSmall.module.css';
import {setPages_action, setScanIndex_action} from "../../Global/Actions";


const InputSmall = function (props) {
    let onChange = function (event) {
        props.dispatch(chooseAction(event.target.value,props.id));
    }

    let chooseAction = (event_target_value,id) => {
        if (props.fieldType === 'scanIndex') {
            return setScanIndex_action(event_target_value,id)
        }
        if (props.fieldType === 'pages') {
            return setPages_action(event_target_value,id)
        }
    }


    return (
        <div className={s.wrapper}>
            <input type={props.type}
                   value={props.field}
                   onChange={onChange}
            placeholder={props.placeholder}
            className={s.input}/>
        </div>

    );
}
export default InputSmall