import React from 'react';
import s from './CaseList.module.css';
import ChooseButton from "../ChooseButton/ChooseButton";
import Input from "../Input/Input";

const CaseList = function (props) {
    let createString = function (el) {
        if (el !== undefined) {
            return (
                <div className={s.stringWrapper}>
                    <div className={s.stringElement}>{el.incomeDate}</div>
                    <div className={s.stringElement}>{el.act}</div>
                    <div className={s.stringElement}>{el.number}</div>
                    <div className={s.smallStringElement}>
                        <ChooseButton dispatch={props.dispatch}
                                      state={props.state}
                                      id={el.id}/>
                    </div>

                </div>)
        }


    }
    let reactContent = props.content.map(createString);


    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <div className={s.headerElement}>дата</div>
                <div className={s.headerElement}>Акт №
                    <Input dispatch={props.dispatch}
                           state={props.state}
                           field={props.state.main.actFilter}
                           fieldType={'actFilter'}
                           type={'number'}/>
                </div>
                <div className={s.headerElement}>Дело №
                    <Input dispatch={props.dispatch}
                           state={props.state}
                           field={props.state.main.caseFilter}
                           fieldType={'caseFilter'}
                           type={'number'}/>
                </div>
                <div className={s.smallHeaderElement}/>
            </div>
            <div className={s.body}>
                {reactContent}
            </div>
            <div className={s.footer}>
                Отображается дел: {props.content.length} из {props.state.main.database.length}
            </div>

        </div>

    );
}
export default CaseList