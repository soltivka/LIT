import React from 'react';
import s from './Choosen.module.css';
import ChoosenString from "./ChoosenString/ChoosenString";
import {post_changes_action} from "../../../Global/Actions";

const Choosen = function (props) {
    let content = function () {
        return props.caseList.map((el) => {
            return (
                <div key={el.index}>
                    <ChoosenString el={el}
                                   dispatch={props.dispatch}/>
                </div>
            )
        })
    }
    let postChanges = function () {
        props.dispatch(post_changes_action())

    }


    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <div className={s.cell}>Номер акта</div>
                <div className={s.cell}>Номер дела</div>
                <div className={s.cell}>страницы</div>
                <div className={s.cell}>индекс</div>
            </div>
            <div className={s.body}>
                {content()}
            </div>
            <div className={s.footer}>
                <div className={s.postButton}
                     onClick={postChanges}>передать на сервер
                </div>
            </div>

        </div>
    )

}
export default Choosen