import React from 'react';
import s from './WorkScreen.module.css';
import CaseString from "./CaseString/CaseString";
import Choosen from "./Choosen/Choosen";
import {adressFilter, indexFilter} from "../../Global/Functions";
import {set_filter_adress_action, set_filter_index_action} from "../../Global/Actions";

const WorkScreen = function (props) {
    const setFilterIndex = function (event) {
        props.dispatch(set_filter_index_action(event.target.value))
    }
    const setFilterAdress = function (event) {
        props.dispatch(set_filter_adress_action(event.target.value))
    }


    let content = function () {
        let totalCases = 0;
        if (props.state.operator_cases.isFetching) {
            return (<div>загрузка....</div>)                           // display load screen
        } else {
            return (props.state.operator_cases.data.map((el) => {

                totalCases++;
                if (el.choosen === false) {                                // check for not-choosen cases (display only not-choosen)
                    let filtredElement = indexFilter(props.state.filters.index, el)
                    filtredElement = adressFilter(props.state.filters.adress,filtredElement)

                    if (filtredElement) {
                        return (
                            <div key={el.index + '' + el.act}>
                                <CaseString datacase={el}
                                            dispatch={props.dispatch}/>
                            </div>
                        )
                    }

                }

            }))
        }
    }
    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <div>
                    <p className={s.bigText}>Оперотор : {props.state.userInfo["name"]}</p>
                    <p className={s.midText}>Личный номер : {props.state.userInfo["id"]}</p>
                </div>
                <div>
                    <p className={s.midText}>дел выполнено: {props.state.userInfo["acts"]}</p>
                    <p className={s.midText}>страниц выполнено: {props.state.userInfo["pages"]}</p>
                </div>
            </div>
            <div className={s.body}>
                <div className={s.caseList}>
                    <div className={s.caseList_header}>
                        <div className={s.topSide}>
                            <div className={s.cell}>Акт</div>
                            <div className={s.cell}>Номер дела</div>
                            <div className={s.cell}>Адрес</div>
                            <div className={s.cell}>Добавить</div>
                        </div>
                        <div className={s.bottomSide}>
                            <div className={s.cell}>
                                <input className={s.searchInput} type={'number'}/>
                            </div>
                            <div className={s.cell}>
                                <input className={s.searchInput} type={'number'}/>
                            </div>
                            <div className={s.cell}>
                                <input className={s.searchInput}
                                       type={'text'}
                                       value={props.state.filters.adress}
                                       onChange={setFilterAdress}/>
                            </div>
                            <div className={s.cell}/>
                        </div>
                    </div>
                    <div className={s.content}>{content()}</div>
                    <div className={s.footer}>
                        {props.state.userInfo["operation"]}
                        дел в списке : {props.state.operator_cases.data.length}
                        <input type={'number'} onChange={setFilterIndex} value={props.state.filters.index}/>
                    </div>
                </div>
                <div className={s.choosen}>
                    <Choosen
                        user={props.state.userInfo}
                        caseList={props.state.choosen_cases}
                        dispatch={props.dispatch}/>
                </div>
            </div>


        </div>
    )

}
export default WorkScreen