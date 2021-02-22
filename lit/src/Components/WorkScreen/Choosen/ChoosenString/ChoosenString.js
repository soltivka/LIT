import React from 'react';
import s from './ChoosenString.module.css';
import {set_scan_number_action, set_scan_pages_action, unchoose_case_action} from "../../../../Global/Actions";

const ChoosenString = function (props) {
    const deleteChoosenString = function (event) {
        props.dispatch(unchoose_case_action(props.el.index))
    }
    const set_scanNumber = function (event) {
        props.dispatch(set_scan_number_action(props.el.index, event.target.value))
    }
    const set_scanPages = function (event) {
        props.dispatch(set_scan_pages_action(props.el.index, event.target.value))
    }


    if (props.user["operation"] === "stitcher") {
        return (
            <div className={s.wrapper}>
                <div className={s.smallcell}>
                    <div className={s.cancelButton}
                         onClick={deleteChoosenString}>
                        <div>+</div>
                    </div>
                </div>
                <div className={s.cell}>

                    {props.el.act}
                </div>
                <div className={s.cell}>{props.el.id}</div>
            </div>
        )
    } else if (props.user["operation"] === "scaner") {
        if(props.el.scanDateStart===''){
            return (
                <div className={s.wrapper}>
                    <div className={s.smallcell}>
                        <div className={s.cancelButton}
                             onClick={deleteChoosenString}>
                            <div>+</div>
                        </div>
                    </div>
                    <div className={s.cell}>
                        {props.el.act}
                    </div>
                    <div className={s.cell}>{props.el.id}</div>

                    <div className={s.cell}>
                        -----
                    </div>
                    <div className={s.cell}>
                        {props.el.stitcher}
                    </div>
                </div>
            )
        }else{
            return (
                <div className={s.wrapper}>
                    <div className={s.smallcell}>
                        <div className={s.cancelButton}
                             onClick={deleteChoosenString}>
                            <div>+</div>
                        </div>
                    </div>
                    <div className={s.cell}>
                        {props.el.act}
                    </div>
                    <div className={s.cell}>{props.el.id}</div>

                    <div className={s.cell}>
                        <input className={s.input} type={'number'}
                               onChange={set_scanNumber} value={props.el.scanNumber}/>
                    </div>
                    <div className={s.cell}>
                        {props.el.stitcher}
                    </div>

                </div>
            )
        }

    } else if (props.user["operation"] === "jointer") {
        return (
            <div className={s.wrapper}>
                <div className={s.smallcell}>
                    <div className={s.cancelButton}
                         onClick={deleteChoosenString}>
                        <div>+</div>
                    </div>
                </div>
                <div className={s.cell}>
                    {props.el.act}
                </div>
                <div className={s.cell}>{props.el.id}</div>
                <div className={s.cell}>
                    {props.el.pages}
                </div>
                <div className={s.cell}>
                    {props.el.scanNumber}
                </div>
                <div className={s.cell}>
                    {props.el.scaner}
                </div>


            </div>
        )
    }


}
export default ChoosenString