import React from 'react';
import s from './UserStatsScreen.module.css';

const UserStatsScreen = function (props) {




    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <div className={s.button}>Всего</div>
                <div className={s.button}>За этот месяц</div>
            </div>
            Статистика будет здеся
        </div>
    )

}
export default UserStatsScreen