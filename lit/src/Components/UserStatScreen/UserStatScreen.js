import React from 'react';
import s from './UserStatScreen.module.css';
import SwitchButton from "./switchButton/SwitchButton";
import {getCurrentMonth} from "../../Global/Functions";
import {setPagesVisible_action} from "../../Global/Actions";
import Cell from "./Cell/Cell";
import {switchViewMode_action} from "../../Global/Actions"


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
        dateStats = getCurrentMonth(props.state.dateUsersStats,props.state.viewMode)
    }
    
    let users = [];
    let content = function () {
        let allUsers = [];
        for (let date in dateStats) {
            for (let user in dateStats[date]) {
                let userIsExist = allUsers.find((existUser) => existUser.name === dateStats[date][user].name)
                if (!userIsExist) {
                    dateStats[date][user]["id"] = user
                    allUsers.push(dateStats[date][user])
                }
            }
        }
        allUsers.sort()
        console.log("all users length " + allUsers.length)
        let content_header_creator = function () {

            allUsers.forEach((user) => {
                users.push(
                    <Cell visible={props.state.projectStats_pagesVisible}
                          key={user.id + user.name}
                          value={user.id}/>
                )
                users.push(
                    <Cell visible={true}
                          key={user.name}
                          value={user.name}/>
                )

            })
            return (
                <tr className={s.headerString} key={"headerString"}>
                    <td className={s.headerCell}> Дата</td>
                    {users}
                    <Cell visible={props.state.projectStats_pagesVisible}
                          value={"Усього за день,справ."}
                    />
                    <Cell visible={true}
                          value={"Усього за день,стор."}
    />
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
                string.push(<td className={s.headerCell} key={date}>{date}</td>)

                allUsers.forEach((userObj) => {
                    let user = userObj.id
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
                        string.push(
                            <Cell visible={props.state.projectStats_pagesVisible}
                                  value={dateStats[date][user].cases}/>)
                        string.push(
                            <Cell visible={true}
                                  value={dateStats[date][user].pages}/>)



                    } else {
                        string.push(
                            <Cell visible={props.state.projectStats_pagesVisible}
                                  value={""}/>)
                        string.push(
                            <Cell visible={true}
                                  value={""}/>)


                    }
                })
                string.push(
                    <Cell visible={props.state.projectStats_pagesVisible}
                          value={stringSum.cases}
                    />
                )
                string.push(
                    <Cell visible={true}
                          value={stringSum.pages}
                          />
                )

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
                let user = userObj.id
                let el = usersTotal[user];
                if (el) {
                    totalSum.pages += Number(el.pages);
                    totalSum.cases += Number(el.cases);

                    footerString.push(
                        <Cell visible={props.state.projectStats_pagesVisible}
                              key={el.cases+'_'+el.pages}
                              value={el.cases}/>
                    )
                    footerString.push(
                            <Cell visible={true}
                                  key={el.pages+'_'+el.cases}
                                  value={el.pages}/>
                    )

                }


            })
            footerString.push(
                <Cell visible={props.state.projectStats_pagesVisible}
                      key={"footerTotalCases"}
                      value={totalSum.cases}/>
            )
            footerString.push(
                    <Cell visible={true}
                          key={"footerTotalPages"}
                          value={totalSum.pages}/>
            )



            return <tr className={s.footerString} key={'footerString'}>{footerString}</tr>
        }
        let content_footer = content_footer_creator();

        return (
            <table className={s.bodyTable}>
                <tbody>
                {content_header}
                {content_body}
                {content_footer}
    </tbody>
    </table>
    )

    }
    let setNeededMonth = function(event){
        if(event.target.value===""){
            props.dispatch(switchViewMode_action("total"))
        }else{
            props.dispatch(switchViewMode_action(event.target.value))
        }
        
    }

    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <div className={s.headerCell}>
                    <input  className={s.monthInput}
                            onChange={setNeededMonth}
                            placeholder={"Вкажіть потрібний місяць"}
                            type={"options"}
                            field={"view mode"}/>
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