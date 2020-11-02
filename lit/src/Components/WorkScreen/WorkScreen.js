import React from 'react';
import s from './WorkScreen.module.css';
import CaseString from "./CaseString/CaseString";
import Choosen from "./Choosen/Choosen";

const WorkScreen = function (props) {
    let content = function () {
        if (props.state.operator_cases.isFetching) {
            return (<div>загрузка....</div>)                           // display load screen
        } else {
            return (props.state.operator_cases.data.map((el) => {
                if (el.choosen === false) {                                // check for not-choosen cases (display only not-choosen)
                    return (
                        <div>
                            <CaseString datacase={el}
                                        dispatch={props.dispatch}/>
                        </div>
                    )
                }

            }))
        }
    }
    return (
        <div className={s.wrapper}>
            <div className={s.caseList}>
                <div className={s.header}>
                    <div className={s.cell}>Акт</div>
                    <div className={s.cell}>Номер дела</div>
                    <div className={s.cell}>Адрес</div>
                    <div className={s.cell}>Добавить</div>
                </div>
                <div className={s.content}>{content()}</div>
            </div>
            <div className={s.choosen}>
                <Choosen caseList={props.state.choosen_cases}
                         dispatch={props.dispatch}/>
            </div>


        </div>
    )

}
export default WorkScreen