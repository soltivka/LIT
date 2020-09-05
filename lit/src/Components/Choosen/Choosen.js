import React from 'react';
import s from './Choosen.module.css';
import {defineColor} from "../../Global/Functions";

const Choosen = function (props) {
    console.log(props)

    let style = {
        boxShadow: "inset 0 1px 20px "+ defineColor(props.state.main.currentNav),
    }


    return (
        <div className={s.wrapper}>
            <div className={s.header}
                 style={style}>

            </div>
            <div className={s.body}></div>
            <div className={s.footer}></div>

        </div>

    );
}
export default Choosen