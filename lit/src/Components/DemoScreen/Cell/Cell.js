import React from 'react';
import  { Component } from "react";
import s from './Cell.module.css';


let  Cell= function (props) {

    if(props.visible===true){
        return (<td className={s.wrapper_2floor}>
                {props.value}
            </td>
        )
    }else{
        return(
            <td className={s.displayNone}></td>

    )}


}
export default Cell