import React from 'react';
import s from './allUsersInfo.module.css';
import SwitchButton from "./switchButton/SwitchButton";
import moment from 'moment'
import {getMomentFromDateString} from "../../Global/Functions";

const UserStatsScreen = function (props) {
    let users = props.state.usersStats
    let fullBlock = [];
    console.log(users)


    if (props.state.userInfo.isAdmin) {
        if(users){
            users.sort((a,b)=>Number(a.id)<Number(b.id)?-1:1)
            let userCardCreator = function(userCard){
                return(
                    <div className={s.usersString}>
                        <div className={s.cell}>{userCard.id}</div>
                        <div className={s.cell}>{userCard.name}</div>
                        <div className={s.cell}>{userCard.operation}</div>
                        <div className={s.cell}>{userCard.userhash}</div>
                        <div className={s.cell}>{userCard.isAdmin?'+':''}</div>
                    </div>
                )
            }

            users.forEach((userCard)=>fullBlock.push(userCardCreator(userCard)))

        }
    }





    return (
        <div className={s.wrapper}>
            <div className={s.body}>
                <div className={s.usersString}>
                    <div className={s.cell}>Ідентифікатор</div>
                    <div className={s.cell}>Ім'я користувача</div>
                    <div className={s.cell}>Професія</div>
                    <div className={s.cell}>Пароль</div>
                    <div className={s.cell}>Права адміністратора</div>
                </div>
                {fullBlock}
            </div>



        </div>
    )

}
export default UserStatsScreen


// cases: 20
// id: "100"
// isAdmin: true
// name: "Катерина Маркелова"
// operation: "stitcher"
// pages: 8060
// userhash: "100"