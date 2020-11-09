import React from 'react';
import s from './ProjectScreen.module.css';
import {reset_userStats_action} from "../../Global/Actions";

const ProjectScreen = function (props) {
    const resetUserStats=function(event) {
        props.dispatch(reset_userStats_action())
    }





    return (
        <div className={s.wrapper}>
            <div className={s.button}
            onDoubleClick={resetUserStats}>Сбросить статистику всех пользователей</div>

        </div>
    )

}
export default ProjectScreen