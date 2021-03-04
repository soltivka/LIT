import React from 'react';
import s from './UserStatScreen.module.css';
import SwitchButton from "./switchButton/SwitchButton";
import {getCurrentMonth} from "../../Global/Functions";
import {setPagesVisible_action} from "../../Global/Actions";
import Cell from "./Cell/Cell";


const UserStatScreen = function (props) {
    const defineClass = function () {

    }
    let projectStats_setPagesVisible = function () {
        props.dispatch(setPagesVisible_action())
    }


    let dateStats;
    if (props.state.viewMode === "total") {
        dateStats = props.state.dateUsersStats
    } else {
        dateStats = getCurrentMonth(props.state.dateUsersStats)
    }
    console.log("dateStats")
    console.log(dateStats)
    let users = [];
    let content = function () {
        let allUsers = [];
        for (let date in dateStats) {
            for (let user in dateStats[date]) {
                let userIsExist = allUsers.find((existUser) => existUser.name === dateStats[date][user].name)
                if (!userIsExist) {
                    dateStats[date][user]["id"]=user
                    allUsers.push(dateStats[date][user])
                }
            }
        }
        allUsers.sort()
        console.log("all users length " + allUsers.length)
        let keyCounter=0;
        let content_header_creator = function () {

            allUsers.forEach((user) => {
                console.log(user)
                console.log("user is here")
                keyCounter++
                users.push(
                    <td className={s.headerCell + ' ' + defineClass()}
                        key={"userHeader" + user.name}>
                        <Cell visible={props.state.projectStats_pagesVisible}
                              key={user.name}
                              value={{
                                  cases: user.id,
                                  pages: user.name
                              }}/>
                    </td>
                )
            })
            return (
                <tr className={s.headerString} key={"headerString"}>
                    <td className={s.headerCell}> Дата</td>
                    {users}
                    <td className={s.headerCell}> Всего за день</td>
                </tr>

            )
        };
        let content_header = content_header_creator();

        let usersTotal = {};  //счетчик суммы для каждого пользователя

        let content_body_creator = function () {
            let keyCounter = 0
            let allStrings = [];
            for (let date in dateStats) {
                let string = [];
                let stringSum = {cases: 0, pages: 0};
                string.push(<td className={s.cell} key={date}>{date}</td>)

                allUsers.forEach((userObj) => {
                    let user=userObj.id
                    console.log('userObj')
                    console.log(userObj)

                    if (dateStats[date][user]) {                              //счетчик суммы для каждого пользователя
                        if (usersTotal[user]) {
                            usersTotal[user].cases = Number(usersTotal[user].cases) + Number(dateStats[date][user].cases)
                            usersTotal[user].pages = Number(usersTotal[user].pages) + Number(dateStats[date][user].pages)
                            console.log(usersTotal)
                        } else {
                            usersTotal[user] = {
                                cases: Number(dateStats[date][user].cases),
                                pages: Number(dateStats[date][user].pages)
                            }
                        }
                    }

                    if (dateStats[date][user]) {                 //создание строки со статистикой пользователей
                        stringSum.cases += Number(dateStats[date][user].cases);
                        stringSum.pages += Number(dateStats[date][user].pages);
                        string.push(<td className={s.cell}
                                        key={dateStats[date][user].cases + '' + user + dateStats[date][user].pages}>

                            <Cell visible={props.state.projectStats_pagesVisible}
                                  value={{
                                      cases: dateStats[date][user].cases,
                                      pages: dateStats[date][user].pages
                                  }}/>
                        </td>)
                    } else {
                        keyCounter++
                        string.push(<td key={keyCounter} className={s.cell}></td>)
                    }
                })
                string.push(<td className={s.cell} key={stringSum.cases + '' + stringSum.pages}>

                    <Cell visible={props.state.projectStats_pagesVisible}
                          value={{
                              cases: stringSum.cases,
                              pages: stringSum.pages
                          }}/>

                </td>)
                allStrings.push(<tr className={s.bodyString} key={'string' + date}>{string}</tr>)
            }

            return allStrings
        }
        let content_body = content_body_creator();

        let content_footer_creator = function () {
            let footerString = [];
            let totalSum = {pages: 0, cases: 0}

            footerString.push(<td className={s.footerCell} key={'stringTotalHeader'}>Усього</td>)
            allUsers.forEach((userObj) => {
                let user=userObj.id
                let el = usersTotal[user];
                if (el) {
                    totalSum.pages += Number(el.pages);
                    totalSum.cases += Number(el.cases);
                    console.log(totalSum)
                    footerString.push(
                        <td className={s.cell} key={el.cases + ' ' + el.pages}>
                            <Cell visible={props.state.projectStats_pagesVisible}
                                  value={{
                                      cases: el.cases,
                                      pages: el.pages
                                  }}/>
                        </td>
                    )
                }


            })


            footerString.push(
                <td className={s.totalCell} key={'allUsersTotal'}>

                    <Cell visible={props.state.projectStats_pagesVisible}
                          value={{
                              cases: totalSum.cases,
                              pages: totalSum.pages
                          }}/>
                </td>
            )
            return <tr className={s.footerString} key={'footerString'}>{footerString}</tr>
        }
        let content_footer = content_footer_creator();

        return (
            <table>
                <tbody>
                {content_header}
                {content_body}
                {content_footer}
                </tbody>
            </table>
        )

    }

    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <div className={s.headerCell}>
                    <SwitchButton text={"Всего"}
                                  value={'total'}
                                  field={"view mode"}
                                  dispatch={props.dispatch}
                                  viewMode={props.state.viewMode}/>
                    <SwitchButton text={"За этот месяц"}
                                  field={"view mode"}
                                  value={'this month'}
                                  dispatch={props.dispatch}
                                  viewMode={props.state.viewMode}/>
                </div>
                <div className={s.headerCell}>
                    <div className={s.checkbox} onClick={projectStats_setPagesVisible}>
                        {props.state.projectStats_pagesVisible ? "Сховати кількість справ" : "Відображується тільки кількість сторінок (розгорнути)"}
                    </div>
                </div>
                <div className={s.headerCell}>
                    <SwitchButton text={"Расшивка"}
                                  field={"statsOperation"}
                                  value={'stitcher'}
                                  dispatch={props.dispatch}
                                  viewMode={props.state.viewMode}
                                  statsOperation={props.state.statsOperation}/>
                    <SwitchButton text={"Сканировка"}
                                  field={"statsOperation"}
                                  value={'scaner'}
                                  dispatch={props.dispatch}
                                  viewMode={props.state.viewMode}
                                  statsOperation={props.state.statsOperation}/>
                    <SwitchButton text={"Сшивка"}
                                  field={"statsOperation"}
                                  value={'jointer'}
                                  dispatch={props.dispatch}
                                  viewMode={props.state.viewMode}
                                  statsOperation={props.state.statsOperation}/>
                </div>

            </div>


            <div className={s.body}>
                {content()}

            </div>
        </div>
    )

}
export default UserStatScreen