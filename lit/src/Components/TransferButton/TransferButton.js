import React from 'react';
import s from './TransferButton.module.css';
import {transferCases_action} from "../../Global/Actions";

const TransferButton = function (props) {
    let onClick = function () {
        props.dispatch(transferCases_action())
    }


    return (
        <div className={s.wrapper}>
            <div className={s.button}
                 onClick={onClick}>Передать
            </div>

        </div>

    );
}
export default TransferButton