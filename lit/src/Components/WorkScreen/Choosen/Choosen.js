import React from 'react';
import s from './Choosen.module.css';
import ChoosenString from "./ChoosenString/ChoosenString";
import {post_changes_action, set_date_day_action} from "../../../Global/Actions";


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
    let defineHeader=function(){
        if(props.user["operation"]==="stitcher"){
            return(
                <div className={s.header}>
                    <div className={s.smallcell}/>
                    <div className={s.cell}>Номер акта</div>
                    <div className={s.cell}>Номер дела</div>
                </div>
            )
        }else if(props.user["operation"]==="scaner"){
            return(
                <div className={s.header}>
                    <div className={s.smallcell}/>
                    <div className={s.cell}>Номер акта</div>
                    <div className={s.cell}>Номер дела</div>
                    <div className={s.cell}>Cтраницы</div>
                    <div className={s.cell}>Индекс</div>
                    <div className={s.cell}>Расшивщик</div>
                </div>
            )
        }else if(props.user["operation"]==="jointer"){
            return(
                <div className={s.header}>
                    <div className={s.smallcell}/>
                    <div className={s.cell}>Номер акта</div>
                    <div className={s.cell}>Номер дела</div>
                    <div className={s.cell}>Страницы</div>
                    <div className={s.cell}>Индекс</div>
                    <div className={s.cell}>Сканировщик</div>
                </div>
            )
        }
    }
    let postChanges = function () {
        props.dispatch(post_changes_action())
    }
    let emptyClick=function(){
        console.log("no cases to change")
    }
    let set_date_day= function(event){
        props.dispatch(set_date_day_action(event.target.value))
    }


    return (
        <div className={s.wrapper}>
            {defineHeader()}
            <div className={s.body}>
                {content()}
            </div>
            <div className={s.footer}>
                <div className={s.postButton}
                     onClick={props.caseList.length>0?postChanges:emptyClick}>передать на сервер
                </div>
                <div>Дел отобрано : {props.caseList.length}</div>
                <div>Дата : {props.date}<input type={'number'}
                                   placeholder={"день месяца"}
                                   onChange={set_date_day}/></div>
            </div>

        </div>
    )

}
export default Choosen