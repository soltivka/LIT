import React from 'react';
import {Component} from "react";
import s from './ProjectStatsScreen.module.css';
import {setPagesVisible_action} from "../../Global/Actions";
import Cell from "./Cell/Cell";


let ProjectStatsScreen = function (props) {

    let total = [{cases: 0, pages: 0}, {cases: 0, pages: 0}, {cases: 0, pages: 0}, {cases: 0, pages: 0}, {
        cases: 0,
        pages: 0
    }, {cases: 0, pages: 0}];
    let projectStats_setPagesVisible = function () {
        props.dispatch(setPagesVisible_action())
    }

    let actsStat = function () {
        let allActs = props.state.projectStats.allActsStats
        console.log(allActs)
        let strings = [];
        for (let actName in allActs) {
            console.log(allActs[actName])
            total[0].cases += Number(allActs[actName].new.cases)
            total[0].pages += Number(allActs[actName].new.pages)
            total[1].cases += Number(allActs[actName].stitcher.cases)
            total[1].pages += Number(allActs[actName].stitcher.pages)
            total[2].cases += Number(allActs[actName].onScan.cases)
            total[2].pages += Number(allActs[actName].onScan.pages)
            total[3].cases += Number(allActs[actName].scaner.cases)
            total[3].pages += Number(allActs[actName].scaner.pages)
            total[4].cases += Number(allActs[actName].jointer.cases)
            total[4].pages += Number(allActs[actName].jointer.pages)
            total[5].cases += Number(allActs[actName].isDone.cases)
            total[5].pages += Number(allActs[actName].isDone.pages)
            console.log(total)
            let string = function () {
                return (
                    <tr className={s.actString} key={'actStatString' + actName}>
                        <td className={s.stringcell}>{actName}</td>
                        <td className={s.stringcell + ' ' + s.new}>{allActs[actName].startDate}</td>
                        <td className={s.stringcell + ' ' + s.new}>
                            <Cell visible={props.state.projectStats_pagesVisible} value={allActs[actName].new}/>
                        </td>

                        <td className={s.stringcell + ' ' + s.stitch}>
                            <Cell visible={props.state.projectStats_pagesVisible} value={allActs[actName].stitcher}/>
                        </td>
                        <td className={s.stringcell + ' ' + s.onScan}>
                            <Cell visible={props.state.projectStats_pagesVisible} value={allActs[actName].onScan}/>
                        </td>
                        <td className={s.stringcell + ' ' + s.scan}>
                            <Cell visible={props.state.projectStats_pagesVisible} value={allActs[actName].scaner}/>
                        </td>
                        <td className={s.stringcell + ' ' + s.joint}>
                            <Cell visible={props.state.projectStats_pagesVisible} value={allActs[actName].jointer}/>
                        </td>
                        <td className={s.stringcell + ' ' + s.done}>
                            <Cell visible={props.state.projectStats_pagesVisible} value={allActs[actName].isDone}/>
                        </td>
                        <td className={s.stringcell + ' ' + s.done}>{allActs[actName].finishDate}</td>
                    </tr>
                )
            }()
            strings.push(string)
        }
        return strings
    }
    let dateStat = function () {
        let allDates = props.state.projectStats.allDatesStats
        let strings = [];
        for (let date in allDates) {
            let string = function () {
                return (
                    <tr className={s.actString} key={'dateString' + date}>
                        <td className={s.stringcell}>{date}</td>

                        <td className={s.stringcell + ' ' + s.new}>
                            <Cell visible={props.state.projectStats_pagesVisible} value={allDates[date].new}/>
                        </td>
                        <td className={s.stringcell + ' ' + s.stitch}>
                            <Cell visible={props.state.projectStats_pagesVisible} value={allDates[date].stitcher}/>
                        </td>
                        <td className={s.stringcell + ' ' + s.onScan}>
                            <Cell visible={props.state.projectStats_pagesVisible} value={allDates[date].onScan}/>
                        </td>
                        <td className={s.stringcell + ' ' + s.scan}>
                            <Cell visible={props.state.projectStats_pagesVisible} value={allDates[date].scaner}/>
                        </td>
                        <td className={s.stringcell + ' ' + s.joint}>
                            <Cell visible={props.state.projectStats_pagesVisible} value={allDates[date].jointer}/>
                        </td>
                        <td className={s.stringcell + ' ' + s.done}>
                            <Cell visible={props.state.projectStats_pagesVisible} value={allDates[date].isDone}/>
                        </td>
                    </tr>
                )
            }()
            strings.push(string)
        }
        return strings
    }


    return (
        <div className={s.wrapper}>
            <div className={s.checkbox} onClick={projectStats_setPagesVisible}>
                {props.state.projectStats_pagesVisible ? "Вимкнути сторінки" : "Увімкнути сторінки"}
            </div>
            <div className={s.wrapper_line}>

                <div className={s.actStats}>
                    <table>
                        <tbody>
                        <tr className={s.segment_header}>
                            <td className={s.cell}>Акт №</td>
                            <td className={s.cell}>Дата получения</td>
                            <td className={s.cell}>Получено</td>
                            <td className={s.cell}>Расшито</td>
                            <td className={s.cell}>На скане</td>
                            <td className={s.cell}>Отскан</td>
                            <td className={s.cell}>Сшито</td>
                            <td className={s.cell}>Сдано</td>
                            <td className={s.cell}>Дата сдачи</td>
                            <td className={s.placeholder}/>
                        </tr>
                        </tbody>
                    </table>

                    <table className={s.segment_body}>
                        <tbody>
                        {actsStat()}
                        </tbody>
                    </table>
                    <table>
                        <tbody>
                        <tr className={s.footer}>
                            <td className={s.cell}>В наличии:</td>
                            <td className={s.cell}/>
                            <td className={s.cell}>
                                <Cell visible={props.state.projectStats_pagesVisible}
                                      value={{
                                          cases: total[0].cases - total[1].cases,
                                          pages: total[0].pages - total[1].pages
                                      }}/>
                            </td>
                            <td className={s.cell}>
                                <Cell visible={props.state.projectStats_pagesVisible}
                                      value={{
                                          cases: total[1].cases - total[2].cases,
                                          pages: total[1].pages - total[2].pages
                                      }}/>
                            </td>
                            <td className={s.cell}>
                                <Cell visible={props.state.projectStats_pagesVisible}
                                      value={{
                                          cases: total[2].cases - total[3].cases,
                                          pages: total[2].pages - total[3].pages
                                      }}/>
                            </td>
                            <td className={s.cell}>
                                <Cell visible={props.state.projectStats_pagesVisible}
                                      value={{
                                          cases: total[3].cases - total[4].cases,
                                          pages: total[3].pages - total[4].pages
                                      }}/>
                            </td>
                            <td className={s.cell}>
                                <Cell visible={props.state.projectStats_pagesVisible}
                                      value={{
                                          cases: total[4].cases - total[5].cases,
                                          pages: total[4].pages - total[5].pages
                                      }}/>
                            </td>
                            <td className={s.cell}>------</td>
                            <td className={s.cell}/>
                            <td className={s.placeholder}/>
                        </tr>
                        </tbody>
                    </table>

                </div>

                <div className={s.actStats}>
                    <table>
                        <tbody>
                        <tr className={s.segment_header}>
                            <td className={s.cell}>Дата</td>
                            <td className={s.cell}>Получено</td>
                            <td className={s.cell}>Расшито</td>
                            <td className={s.cell}>На скане</td>
                            <td className={s.cell}>Отскан</td>
                            <td className={s.cell}>Сшито</td>
                            <td className={s.cell}>Сдано</td>
                            <td className={s.placeholder}/>
                        </tr>
                        </tbody>
                    </table>

                    <table className={s.segment_body}>
                        <tbody>
                        {dateStat()}
                        </tbody>
                    </table>

                    <table>
                        <tbody>
                        <tr className={s.footer}>
                            <td className={s.cell}>Всего:</td>
                            <td className={s.cell}>
                                <Cell visible={props.state.projectStats_pagesVisible}
                                      value={total[0]}/>
                            </td>
                            <td className={s.cell}>
                                <Cell visible={props.state.projectStats_pagesVisible}
                                      value={total[1]}/>
                            </td>
                            <td className={s.cell}>
                                <Cell visible={props.state.projectStats_pagesVisible}
                                      value={total[2]}/>
                            </td>
                            <td className={s.cell}>
                                <Cell visible={props.state.projectStats_pagesVisible}
                                      value={total[3]}/>
                            </td>
                            <td className={s.cell}>
                                <Cell visible={props.state.projectStats_pagesVisible}
                                      value={total[4]}/>
                            </td>
                            <td className={s.cell}>
                                <Cell visible={props.state.projectStats_pagesVisible}
                                      value={total[5]}/>
                            </td>
                            <td className={s.placeholder}></td>
                        </tr>
                        </tbody>
                    </table>

                </div>

            </div>
        </div>
    )

}
export default ProjectStatsScreen