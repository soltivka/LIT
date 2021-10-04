import React from 'react';
import  { Component } from "react";
import s from './Cell.module.css';


let  Cell= function (props) {

    if(props.visible===true){
        return (<div className={s.wrapper_2floor}>
                <div className={s.inner}>{props.value.cases}</div>
                <div className={s.inner}>{props.value.pages}</div>
            </div>
        )
    }else{
        return(
            <div className={s.wrapper}>
                <div className={s.inner}>{props.value.cases}</div>
            </div>

    )}


}
export default Cell