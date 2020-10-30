import React from 'react';
import s from './AuthScreen.module.css';
import {get_data_action, set_user_action} from "../../Global/Actions";

const AuthScreen = function (props) {
    let change=function(event){
        props.dispatch(set_user_action(event.target.value))
    }




    return (
        <div className={s.wrapper}>
            <div className={s.window}>
                Choose your destiny
                <input placeholder={'enter code here'}
                onChange={change}></input>


            </div>


        </div>

    );
}
export default AuthScreen