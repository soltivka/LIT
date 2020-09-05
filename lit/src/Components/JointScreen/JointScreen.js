import React from 'react';
import s from './JointScreen.module.css';
import Choosen from "../Choosen/Choosen";

const JointScreen = function (props) {
    let createJointString = (el) => {
        return (
            <div className={s.jointString}>
                <div className={s.block}>{el.incomeDate}</div>
                <div className={s.block}>{el.act}</div>
                <div className={s.block}>{el.number}</div>
                <div className={s.block}>+</div>
            </div>
        )
    };
    let createJointPage = (data) => {
        return data.map((el) => {
            return createJointString(el);
        })
    }
    let jointPage = createJointPage(props.database);

    return (
        <div className={s.wrapper}>
            <div className={s.jointListWrapper}>
                <div className={s.jointHead}>
                    <div className={s.headBlock}>Дата прихода</div>
                    <div className={s.headBlock}>акт №</div>
                    <div className={s.headBlock}>дело №</div>
                    <div className={s.headBlock}>Добавить в список</div>
                </div>

                <div className={s.jointPage}>{jointPage}</div>

            </div>
            <div className={s.choosenWrapper}>
                <Choosen
                dispatch={props.dispatch}
                state={props.state}></Choosen>
            </div>



        </div>
    );
}
export default JointScreen