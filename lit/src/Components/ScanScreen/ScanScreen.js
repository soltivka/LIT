import React from 'react';
import s from './ScanScreen.module.css';
import Choosen from "../Choosen/Choosen";

const ScanScreen = function (props) {
    let createString = (el,i) => {
        if(el.jointer!==0&&el.scaner===0&&el.stitcher===0&&el.visible===true){
            return (
                <div className={s.jointString}>
                    <div className={s.block}>{el.incomeDate}</div>
                    <div className={s.block}>{el.act}</div>
                    <div className={s.block}>{el.number}</div>
                    <div className={s.block}
                    id={i}>+</div>
                </div>
            )
        }else return

    };
    let createPage = (data) => {
        return data.map((el,i) => {
            return createString(el);
        })
    }
    let jointPage = createPage(props.state.main.database);

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
                    state={props.state}/>

            </div>



        </div>
    );
}
export default ScanScreen