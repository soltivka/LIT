import React from 'react';
import s from './ChoosenString.module.css';
import {set_scan_number_action, set_scan_pages_action, unchoose_case_action} from "../../../../Global/Actions";

const ChoosenString = function (props) {
    const deleteChoosenString= function(event){
        props.dispatch(unchoose_case_action(props.el.index))
    }
    const set_scanNumber = function(event){
        props.dispatch(set_scan_number_action(props.el.index, event.target.value))
    }
    const set_scanPages = function(event){
        props.dispatch(set_scan_pages_action(props.el.index, event.target.value))
    }



    return (
        <div className={s.wrapper}>
            <div className={s.cell}>
                <div className={s.cancelButton}
                onClick={deleteChoosenString}>+</div>
                {props.el.act}
            </div>
            <div className={s.cell}>{props.el.id}</div>
            <div className={s.cell}>
                <input className={s.input} type={'number'}
                onChange={set_scanPages} value={props.el.pages}/>
            </div>
            <div className={s.cell}>
                <input className={s.input} type={'number'}
                onChange={set_scanNumber} value={props.el.scanNumber}/>
            </div>



        </div>
    )

}
export default ChoosenString