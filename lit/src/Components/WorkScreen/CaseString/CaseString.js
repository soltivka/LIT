import React from 'react';
import s from './CaseString.module.css';
import AddButton from "../addButton/AddButton";

const CaseString = function (props) {
    let el= props.datacase;

    return (
        <div className={s.wrapper}>
            <div className={s.cell}>{el.act}</div>
            <div className={s.cell}>{el.id}</div>
            <div className={s.cell}>{el.street +'  '+ el.adress}</div>
            <div className={s.cell}>
                <AddButton dispatch={props.dispatch}
                             el={props.datacase}/>
            </div>
        </div>
    )

}
export default CaseString