import React from 'react';
import s from './JointScreen.module.css';

const JointScreen = function (props) {
    let createJointString = (el) => {
        return (
            <div className={s.jointString}>
                <div className={s.block}>{el.incomeDate}</div>
                <div className={s.block}>{el.act}</div>
                <div className={s.block}>{el.number}</div>
                <input type={'number'} placeholder={'сшивщик'} className={s.block}></input>
                <input type={'number'} placeholder={'дата'} className={s.block}></input>
            </div>
        )
    };
    let createJointPage = (data)=>{
        return data.map((el) => {
            return createJointString(el);
        })
    }
    let jointPage=createJointPage(props.database);

    return (
        <div className={s.wrapper}>
            <div className={s.jointString}>
                <div className={s.block}>Дата прихода</div>
                <div className={s.block}>акт №</div>
                <div className={s.block}>дело №</div>
                <div className={s.block}>расшивщик</div>
                <div className={s.block}>дата расшивки</div>
            </div>

            <div>{jointPage}</div>


        </div>
    );
}
export default JointScreen