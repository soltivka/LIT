import React from 'react';
import s from './Choosen.module.css';
import {defineColor} from "../../Global/Functions";
import CancelButton from "../CancelButton/CancelButton";
import Input from "../Input/Input";

const Choosen = function (props) {

    let headerstyle = {
        boxShadow: "inset 0 1px 20px " + defineColor(props.state.main.currentNav),
    }
    let wrapperstyle = {
        boxShadow: "inset 0 0 40px " + defineColor(props.state.main.currentNav),
    }

    let createChoosenString = (el, i) => {
        return (
            <div className={s.string}>
                <div className={s.block}>{el.incomeDate}</div>
                <div className={s.block}>{el.act}</div>
                <div className={s.block}>{el.number}</div>
                <CancelButton
                    id={el.id}
                    dispatch={props.dispatch}/>
            </div>
        )
    };
    let choosenContent = (data) => {
        return data.map((el, i) => {
            if (el.choosen === true) {
                return createChoosenString(el, i);
            }
        })
    }
    let counter = (data) => {
        let count = 0;
        data.map((el) => {
            if (el.choosen === true) {
                count++
            }

        })
        return count;
    }
    let date = new Date().toDateString();


    return (
        <div className={s.wrapper}
             style={wrapperstyle}>
            <div className={s.header}
                 style={headerstyle}>
                <div> Operator:
                    <Input type={'number'}
                           field={props.state.main.operator}
                           state={props.state}
                           dispatch={props.dispatch}/>
                </div>
                <div>
                    Date: {date}
                </div>

            </div>
            <div className={s.body}>
                {choosenContent(props.state.main.database)}


            </div>
            <div className={s.footer}>
                <div>отобрано дел: {counter(props.state.main.database)}</div>
                <div className={s.button}>Передать</div>
            </div>

        </div>

    );
}
export default Choosen