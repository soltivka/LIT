import React from 'react';
import s from './ChoosenString.module.css';

const ChoosenString = function (props) {



    return (
        <div className={s.wrapper}>
            <div className={s.cell}>{props.el.act
            }</div>
            <div className={s.cell}>{props.el.id}</div>
            <div className={s.cell}>
                <input className={s.input} type={'number'}/>
            </div>
            <div className={s.cell}>
                <input className={s.input} type={'number'}/>
            </div>



        </div>
    )

}
export default ChoosenString