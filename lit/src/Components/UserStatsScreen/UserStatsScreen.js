import React from 'react';
import s from './UserStatsScreen.module.css';
import SwitchButton from "./switchButton/SwitchButton";
import moment from 'moment'
import {getMomentFromDateString} from "../../Global/Functions";

const UserStatsScreen = function (props) {
    let userTotal = {};
    let userDays= {};


    console.log(props.state.usersStats)
    let usersStats=[];
    if (props.state.userInfo.isAdmin) {
        if (props.state.viewMode === 'total') {
            usersStats = props.state.usersStats;
            if(usersStats){
                usersStats.forEach((el)=>{
                    for(let user in el){
                        if(user!=='date'){
                            if(typeof(userTotal[user])==="number"&&typeof(userDays[user])==="number"){
                                userTotal[user]=el[user].cases>0?userTotal[user]+=el[user].cases:userTotal[user]
                                userDays[user]=el[user].cases>0?userDays[user]+1:userDays[user]
                            }else{
                                userTotal[user]=el[user].cases>0?el[user].cases:0
                                userDays[user]=el[user].cases>0?1:0
                            }
                        }
                    }
                })
            }
            console.log(userTotal);
            console.log(userDays)

        } else if (props.state.viewMode === 'this month') {
            props.state.usersStats.forEach((el, i, arr) => {
                let m_date = getMomentFromDateString((el.date))
                if (moment().isSame(m_date, 'month')) {
                    usersStats.push(el)
                }
            })
            if(usersStats){
                usersStats.forEach((el)=>{
                    for(let user in el){
                        if(user!=='date'){
                            if(typeof(userTotal[user])==="number"&&typeof(userDays[user])==="number"){
                                userTotal[user]=el[user].cases>0?userTotal[user]+=el[user].cases:userTotal[user]
                                userDays[user]=el[user].cases>0?userDays[user]+1:userDays[user]
                            }else{
                                userTotal[user]=el[user].cases>0?el[user].cases:0
                                userDays[user]=el[user].cases>0?1:0
                            }
                        }
                    }
                })
            }
        }
        console.log(userTotal)
        console.log(userDays)

    } else {
        if (props.state.usersStats) {
            if(props.state.viewMode === 'total'){
                usersStats = props.state.usersStats.map((dateObj) => {
                    let userKey = props.state.userInfo.id;
                    return ({
                        date: dateObj.date,
                        [userKey]: dateObj[userKey],
                    })
                })
                if(usersStats){
                    usersStats.forEach((el)=>{
                        for(let user in el){
                            if(user!=='date'){
                                if(typeof(userTotal[user])==="number"&&typeof(userDays[user])==="number"){
                                    userTotal[user]=el[user].cases>0?userTotal[user]+=el[user].cases:userTotal[user]
                                    userDays[user]=el[user].cases>0?userDays[user]+1:userDays[user]
                                }else{
                                    userTotal[user]=el[user].cases>0?el[user].cases:0
                                    userDays[user]=el[user].cases>0?1:0
                                }
                            }
                        }
                    })
                }
            }else if(props.state.viewMode === 'this month'){
                let parsedUserStats= props.state.usersStats.map((dateObj) => {
                    let userKey = props.state.userInfo.id;
                    return ({
                        date: dateObj.date,
                        [userKey]: dateObj[userKey],
                    })
                })
                parsedUserStats.forEach((el, i, arr) => {
                    let m_date = getMomentFromDateString((el.date))
                    if (moment().isSame(m_date, 'month')) {
                        usersStats.push(el)
                    }
                })
                if(usersStats){
                    usersStats.forEach((el)=>{
                        for(let user in el){
                            if(user!=='date'){
                                if(typeof(userTotal[user])==="number"&&typeof(userDays[user])==="number"){
                                    userTotal[user]=el[user].cases>0?userTotal[user]+=el[user].cases:userTotal[user]
                                    userDays[user]=el[user].cases>0?userDays[user]+1:userDays[user]
                                }else{
                                    userTotal[user]=el[user].cases>0?el[user].cases:0
                                    userDays[user]=el[user].cases>0?1:0
                                }
                            }
                        }
                    })
                }
            }
        }
    }

    let headerClassFinder = function (operation) {
        if (operation === "stitcher") {
            return s.headerStitcher
        }
        if (operation === "scaner") {
            return s.headerScaner
        }
        if (operation === "jointer") {
            return s.headerJointer
        }
    }
    let stringClassFinder = function (operation) {
        if (operation === "stitcher") {
            return s.stitcher
        }
        if (operation === "scaner") {
            return s.scaner
        }
        if (operation === "jointer") {
            return s.jointer
        }
    }
    let createOperatorsString = function () {
        if (usersStats) {
            let operatorsString = [];
            for (let user in usersStats[0]) {
                console.log(usersStats[0][user]);
                if (user !== "date") {
                    operatorsString.push((
                        <td key={user}
                            className={s.headerCell + ' ' + headerClassFinder(usersStats[0][user].operation)}>{user}</td>
                    ))
                }
            }
            return operatorsString
        }
    }
    let createTotalString=function(){
        let totals=[]
        if(usersStats){
            for(let user in userTotal){
                totals.push(<td className={s.cell} key={user+userTotal[user]}>{userTotal[user]}</td>)
            }
        }
        return totals;
    }
    let createAvarageString=function(){
        let avarages=[];
        if(usersStats){
            for(let user in userTotal){
                avarages.push(<td className={s.cell} key={'avarage'+user+userTotal[user]}>{(userTotal[user]/userDays[user]).toFixed(1)}</td>)
            }
        }
        return avarages
    }


    let createDateStrings = function () {
        if (usersStats) {
            let dateStrings = [];
            for (let date in usersStats) {
                let usersString = [];
                for (let user in usersStats[date]) {
                    if (user !== "date") {
                        usersString.push(
                            <td className={s.cell + ' ' + stringClassFinder(usersStats[date][user].operation)}
                                key={date + user + usersStats[date][user].cases}>
                                {usersStats[date][user].cases}
                            </td>)
                    }

                }
                dateStrings.push(
                    <tr className={s.usersString}
                        key={date}>
                        <td className={s.cell}>{usersStats[date].date}</td>
                        {usersString}
                    </tr>)
            }
            return dateStrings;

        }
    }


    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <SwitchButton text={"Всего"}
                              value={'total'}
                              dispatch={props.dispatch}
                              viewMode={props.state.viewMode}/>
                <SwitchButton text={"За этот месяц"}
                              value={'this month'}
                              dispatch={props.dispatch}
                              viewMode={props.state.viewMode}/>
            </div>
            <div className={s.body}>
                <table>
                    <tbody>
                    <tr className={s.tableHeader}>
                        <td className={s.headerCell}>Дата</td>
                        {createOperatorsString()}
                    </tr>
                    <tr className={s.tableBody}>
                        {createDateStrings()}
                    </tr>
                    <tr className={s.tableFooter}>
                        <td className={s.cell}>Всего:</td>
                        {createTotalString()}
                    </tr>
                    <tr className={s.tableFooter}>
                        <td className={s.cell}>В среднем:</td>
                        {createAvarageString()}
                    </tr>
                    <tr className={s.tableFooter}>
                        <td className={s.cell}>Страниц в среднем::</td>

                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )

}
export default UserStatsScreen