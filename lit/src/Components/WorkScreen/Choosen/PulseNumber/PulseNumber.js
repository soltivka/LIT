import React from 'react';
import s from './PulseNumber.module.css';

const PulseNumber = function (props) {
    let value=props.value
    let classDisabler=function(){

    }


    return (
        <div className={s.pulseNumber}>
            {value}
        </div>
    )

}
export default PulseNumber