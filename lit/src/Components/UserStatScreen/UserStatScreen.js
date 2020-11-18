import React from 'react';
import s from './UserStatScreen.module.css';
import SwitchButton from "./switchButton/SwitchButton";


const UserStatScreen = function (props) {
    const defineClass = function () {

    }


    let dateStats = props.state.dateUsersStats;
    let users = [];
    let content = function () {
        let allUsers = [];
        for (let date in dateStats) {
            for (let user in dateStats[date]) {
                let userIsExist = allUsers.find((existUser) => existUser === user)
                if (!userIsExist) {
                    allUsers.push(user)
                }
            }
        }

        let content_header_creator = function () {
            allUsers.forEach((user) => {
                users.push(<td className={s.headerCell + ' ' + defineClass()} key={"userHeader" + user}>{user}</td>)
            })
            return (
                <tr className={s.headerString}>
                    <td className={s.headerCell}> Дата</td>
                    {users}
                    <td className={s.headerCell}> Всего за день</td>
                </tr>

            )
        };
        let content_header = content_header_creator()

        let content_body_creator=function(){
            let allStrings=[];
            for(let date in dateStats){
                let string = [];
                let stringSum=0;
                string.push(<td className={s.cell}>{date}</td>)
                users.forEach((user)=> {
                    if(dateStats[date][user]){
                        stringSum+=dateStats[date][user];
                        string.push(<td className={s.cell}>{dateStats[date][user]}</td>)
                    }
                })
                string.push(<td className={s.cell}>{stringSum}</td>)
                allStrings.push(<tr className={s.bodyString}>{string}</tr>)
            }
            return allStrings
        }
        let content_body=content_body_creator();

        return (
            <table>
                <tbody>
                    {content_header}
                    {content_body}
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
                    <SwitchButton text={"Расшивка"}
                                  field={"statsOperation"}
                                  value={'stitcher'}
                                  dispatch={props.dispatch}
                                  viewMode={props.state.viewMode}/>
                    <SwitchButton text={"Сканировка"}
                                  field={"statsOperation"}
                                  value={'scaner'}
                                  dispatch={props.dispatch}
                                  viewMode={props.state.viewMode}/>
                    <SwitchButton text={"Сшивка"}
                                  field={"statsOperation"}
                                  value={'jointer'}
                                  dispatch={props.dispatch}
                                  viewMode={props.state.viewMode}/>
                </div>
            </div>


            <div className={s.body}>
                {content()}

            </div>
        </div>
    )

}
export default UserStatScreen