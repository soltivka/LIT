import React from 'react';
import s from './CancelButton.module.css';
import {cancelChooseCase_action, chooseCase_action} from "../../Global/Actions";

const CancelButton = function (props) {
    let click=function(){
        props.dispatch(cancelChooseCase_action(props.id))
    }




    return (
        <div className={s.wrapper}>
            <div className={s.button}
            onClick={click}>
                <h1 className={s.plus}>+</h1>
            </div>

        </div>

    );
}
export default CancelButton