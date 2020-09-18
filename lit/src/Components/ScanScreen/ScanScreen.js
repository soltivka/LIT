import React from 'react';
import s from './ScanScreen.module.css';
import Choosen from "../Choosen/Choosen";
import CaseList from "../CaseList/CaseList";
import {applyFilters} from "../../Global/Functions";

const ScanScreen = function (props) {
    let getScanElement = (el, i) => {
        if (el.jointer !== 0 && el.scaner === 0 && el.stitcher === 0 && el.visible === true) {
            return applyFilters(el,props.state.main)
        } else return

    };
    let getContent = (data) => {
        return data.filter((el, i) => {
            return getScanElement(el);
        })
    }
    let content = getContent(props.state.main.database);

    return (
        <div className={s.wrapper}>
            <div className={s.jointListWrapper}>

                <CaseList dispatch={props.dispatch}
                          content={content}
                          state={props.state}/>


            </div>
            <div className={s.choosenWrapper}>
                <Choosen
                    dispatch={props.dispatch}
                    state={props.state}/>

            </div>


        </div>
    );
}
export default ScanScreen