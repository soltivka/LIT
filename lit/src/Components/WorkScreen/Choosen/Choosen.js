import React from 'react';
import s from './Choosen.module.css';
import ChoosenString from "./ChoosenString/ChoosenString";
import {post_changes_action, set_date_day_action} from "../../../Global/Actions";
import PulseNumber from "./PulseNumber/PulseNumber";


const Choosen = function (props) {
    let content = function () {
        return props.caseList.map((el) => {
            return (
                <div key={el.index}>
                    <ChoosenString el={el}
                                   user={props.user}
                                   dispatch={props.dispatch}/>
                </div>
            )
        })
    }
    let defineHeader = function () {
        if (props.user["operation"] === "stitcher") {
            return (
                <div className={s.header}>
                    <div className={s.smallcell}/>
                    <div className={s.cell}>Акт</div>
                    <div className={s.cell}>Номер справи</div>
                </div>
            )
        } else if (props.user["operation"] === "scaner") {
            return (
                <div className={s.header}>
                    <div className={s.smallcell}/>
                    <div className={s.cell}>Акт</div>
                    <div className={s.cell}>Номер справи</div>
                    <div className={s.cell}>Індекс</div>
                    <div className={s.cell}>Розшив</div>
                </div>
            )
        } else if (props.user["operation"] === "jointer") {
            return (
                <div className={s.header}>
                    <div className={s.smallcell}/>
                    <div className={s.cell}>Акт</div>
                    <div className={s.cell}>Номер справи</div>
                    <div className={s.cell}>Сторінок</div>
                    <div className={s.cell}>Індекс</div>
                    <div className={s.cell}>Сканувальник</div>
                </div>
            )
        }
    }
    let postChanges = function () {

        let indexNotSet = props.caseList.find((el) => {
            return el.scanNumber === '' && el.scanDateStart !== ''
        })
        if (!indexNotSet) {
            props.dispatch(post_changes_action())
        } else alert("Усі індекси мають бути заповнені")

    }
    let emptyClick = function () {
        alert("no cases to change")
    }
    let set_date_day = function (event) {
        props.dispatch(set_date_day_action(event.target.value))
    }



    return (
        <div className={s.wrapper}>
            {defineHeader()}
            <div className={s.body}>
                {content()}
            </div>
            <div className={s.footer}>
                <div className={props.isFetching ? s.hideButton : s.postButton}
                     onClick={props.caseList.length > 0 ? postChanges : emptyClick}>Відправити
                </div>
                <div>Справ відібрано :
                    <PulseNumber className={s.pulseNumber} value={props.caseList.length} key={"choosenCounter-pulseNumber" + props.caseList.length}/>
                </div>
                <div>Дата : {props.date}
                    <input

                        className={s.input}
                        type={'number'}
                        placeholder={"день месяца"}
                        onChange={set_date_day}/>
                </div>
            </div>

        </div>
    )

}
export default Choosen