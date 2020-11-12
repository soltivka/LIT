import React from 'react';
import s from './UserStatsScreen.module.css';

const UserStatsScreen = function (props) {
    console.log(props.state.usersStats)
    let usersStats = props.state.usersStats

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

                console.log(usersStats[0][user].operation);
                operatorsString.push((
                    <td key={user}
                        className={s.headerCell + ' ' + headerClassFinder(usersStats[0][user].operation)}>{user}</td>
                ))
            }
            return operatorsString
        }
    }
    let createDateStrings = function () {
        if (usersStats) {
            let dateStrings = [];
            for (let date in usersStats) {
                let usersString = [];
                for (let user in usersStats[date]) {
                    console.log()
                    usersString.push(<td>{usersStats[date][user].cases}</td>)
                }
                dateStrings.push(<tr>
                    <td>{usersStats[date].date}</td>
                    {usersString}</tr>)
            }
            return dateStrings;

        }
    }


    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <div className={s.button}>Всего</div>
                <div className={s.button}>За этот месяц</div>
            </div>
            <div className={s.body}>
                <table>
                    <tbody>
                    <tr className={s.tableHeader}>
                        <td className={s.headerCell}>Дата</td>
                        {createOperatorsString()}
                    </tr>

                        {createDateStrings()}

                    </tbody>
                </table>
            </div>
        </div>
    )

}
export default UserStatsScreen