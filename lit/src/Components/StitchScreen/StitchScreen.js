import React from 'react';
import s from './StitchScreen.module.css';
import Choosen from "../Choosen/Choosen";
import CaseList from "../CaseList/CaseList";

const StitchScreen = function (props) {
    let getStitchElement = (el) => {
        if (el.jointer !== 0 && el.scaner !== 0 && el.stitcher === 0 && el.visible === true) {
            return el
        } else return

    };
    let getStitchContent = (data) => {
        return data.filter((el) => {
            return getStitchElement(el);
        })
    }
    let content = getStitchContent(props.state.main.database);

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
export default StitchScreen