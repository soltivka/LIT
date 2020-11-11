import React from 'react';
import s from './ProjectStatsScreen.module.css';


const ProjectStatsScreen = function (props) {
    let total = [0, 0, 0, 0, 0];
    let actsStat = function () {
        let allActs = props.state.projectStats.allActsStats
        let strings = [];
        for (let actName in allActs) {
            total[0] += allActs[actName].new
            total[1] += allActs[actName].stitcher
            total[2] += allActs[actName].scaner
            total[3] += allActs[actName].jointer
            total[4] += allActs[actName].isDone
            let string = function () {
                return (
                    <tr className={s.actString} key={'actStatString' + actName}>
                        <td className={s.stringcell}>{actName}</td>
                        <td className={s.stringcell + ' ' + s.new}>{allActs[actName].startDate}</td>
                        <td className={s.stringcell + ' ' + s.new}>{allActs[actName].new}</td>
                        <td className={s.stringcell + ' ' + s.stitch}>{allActs[actName].stitcher}</td>
                        <td className={s.stringcell + ' ' + s.scan}>{allActs[actName].scaner}</td>
                        <td className={s.stringcell + ' ' + s.joint}>{allActs[actName].jointer}</td>
                        <td className={s.stringcell + ' ' + s.done}>{allActs[actName].isDone}</td>
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
                        <td className={s.stringcell + ' ' + s.new}>{allDates[date].new}</td>
                        <td className={s.stringcell + ' ' + s.stitch}>{allDates[date].stitcher}</td>
                        <td className={s.stringcell + ' ' + s.scan}>{allDates[date].scaner}</td>
                        <td className={s.stringcell + ' ' + s.joint}>{allDates[date].jointer}</td>
                        <td className={s.stringcell + ' ' + s.done}>{allDates[date].isDone}</td>
                    </tr>
                )
            }()
            strings.push(string)
        }
        return strings
    }


    return (
        <div className={s.wrapper}>
            <div className={s.actStats}>
                <table>
                    <tbody>
                        <tr className={s.segment_header}>
                            <td className={s.cell}>Акт №</td>
                            <td className={s.cell}>Дата получения</td>
                            <td className={s.cell}>Получено</td>
                            <td className={s.cell}>Расшито</td>
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
                <div className={s.footer}>
                    <div className={s.cell}>В наличии:</div>
                    <div className={s.cell}></div>
                    <div className={s.cell}>{total[0]-total[1]}</div>
                    <div className={s.cell}>{total[1]-total[2]}</div>
                    <div className={s.cell}>{total[2]-total[3]}</div>
                    <div className={s.cell}>{total[3]-total[4]}</div>
                    <div className={s.cell}>------</div>
                    <div className={s.cell}></div>
                    <div className={s.placeholder}></div>

                </div>
            </div>

            <div className={s.actStats}>
                <div className={s.segment_header}>
                    <div className={s.cell}>Дата</div>
                    <div className={s.cell}>Получено</div>
                    <div className={s.cell}>Расшито</div>
                    <div className={s.cell}>Отскан</div>
                    <div className={s.cell}>Сшито</div>
                    <div className={s.cell}>Сдано</div>
                    <div className={s.placeholder}/>
                </div>
                <table className={s.segment_body}>
                    <tbody>
                        {dateStat()}
                    </tbody>
                </table>
                <div className={s.footer}>
                    <div className={s.cell}>Всего:</div>
                    <div className={s.cell}>{total[0]}</div>
                    <div className={s.cell}>{total[1]}</div>
                    <div className={s.cell}>{total[2]}</div>
                    <div className={s.cell}>{total[3]}</div>
                    <div className={s.cell}>{total[4]}</div>
                    <div className={s.placeholder}></div>

                </div>
            </div>
        </div>
    )

}
export default ProjectStatsScreen