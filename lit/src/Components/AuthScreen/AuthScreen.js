import React from 'react';
import s from './AuthScreen.module.css';
import {
     set_userhash_action,
    userHash_request_action
} from "../../Global/Actions";

const AuthScreen = function (props) {

    let change = function (event) {
        props.dispatch(set_userhash_action(event.target.value))
    }
    let handleEnter = (event) => {
        if (event.key === 'Enter') {
            props.dispatch(userHash_request_action(props.state.user))
        }
        if (event.key === ',') {
            event.preventDefault();
        }
    }


    return (
        <div className={s.wrapper}>
            <div className={s.window}>
                АВТОРИЗАЦІЯ
                <input autoFocus
                    className={s.input}
                    placeholder={'відскануйте код'}
                       onChange={change}
                       onKeyPress={handleEnter}/>


            </div>


        </div>

    );
}
export default AuthScreen