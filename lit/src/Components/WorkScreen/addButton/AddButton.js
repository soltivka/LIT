import React from 'react';
import s from './AddButton.module.css';
import {choose_case_action} from "../../../Global/Actions";

const AddButton = function (props) {
    const onclick=function(event){
        props.dispatch(choose_case_action(props.el.index));
        console.log('click')

    }


    return (
        <div className={s.wrapper}>
            <div className={s.square}
            onClick={onclick}>
                +
            </div>

        </div>
    )

}
export default AddButton