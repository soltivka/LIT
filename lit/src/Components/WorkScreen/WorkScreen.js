import React from 'react';
import s from './WorkScreen.module.css';
import CaseString from "./CaseString/CaseString";
import Choosen from "./Choosen/Choosen";
import {actFilter, adressFilter, applyFilters, idFilter, indexFilter} from "../../Global/Functions";
import {
    change_admin_operation_action, choose_case_action,
    set_filter_act_action,
    set_filter_adress_action,
    set_filter_id_action,
    set_filter_index_action
} from "../../Global/Actions";


const WorkScreen = function (props) {

    const addCaseToChoosen = function (event) {
        if (event.key === "Enter") {
            console.log(event.target.value)
            props.dispatch(choose_case_action(event.target.value));
        }
        if (event.key === ",") {
            event.preventDefault();
        }
    }

    let casesToView = 0;
    let filtredCasesCount=0;
    const setFilterIndex = function (event) {
        props.dispatch(set_filter_index_action(event.target.value))
    }
    const setFilterAdress = function (event) {
        props.dispatch(set_filter_adress_action(event.target.value))
    }
    const setFilterAct = function (event) {
        props.dispatch(set_filter_act_action(event.target.value))
    }
    const setFilterId = function (event) {
        props.dispatch(set_filter_id_action(event.target.value))
    }
    const changeAdminOperation = function (event) {
        let value = event.target.getAttribute('value');
        props.dispatch(change_admin_operation_action(value))
    }

    let adminWindow = function () {
        if (props.state.userInfo.isAdmin) {
            return (<div>
                    <div className={s.changeOperation} value={"stitcher"} onClick={changeAdminOperation}>Стать
                        расшивщиком
                    </div>
                    <div className={s.changeOperation} value={"scaner"} onClick={changeAdminOperation}>Стать
                        сканировщиком
                    </div>
                    <div className={s.changeOperation} value={"jointer"} onClick={changeAdminOperation}>Стать
                        сшивщиком
                    </div>
                </div>
            )
        }
    }


    let content = function () {
        if (props.state.operator_cases.isFetching) {
            return (<div>загрузка....</div>)                           // display load screen
        } else {
            return (props.state.operator_cases.data.map((el, i, arr) => {

                if (el.choosen === false) {                                // check for not-choosen cases (display only not-choosen)
                    let filtredElement = applyFilters(props.state.filters, el);
                    if (filtredElement) {
                        filtredCasesCount++
                        if (casesToView < 500) {
                            casesToView++;
                            return (
                                <div key={el.index + '' + el.act}>
                                    <CaseString datacase={el}
                                                user={props.state.userInfo}
                                                dispatch={props.dispatch}/>
                                </div>
                            )
                        }

                    }

                }

            }))
        }
    }
    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <div>
                    <p className={s.bigText}>Оператор : {props.state.userInfo["name"]}

                    </p>
                    <p className={s.bigText}>
                        {props.state.userInfo["operation"] === "stitcher" ? "Розшивка " :
                            (props.state.userInfo["operation"] === "scaner" ? "Сканування " : "Зшивка ")}
                    </p>

                    <p className={s.midText}>Особистий номер: {props.state.userInfo["id"]}</p>
                </div>
                <div>
                    <p className={s.midText}>Справ оброблено: {props.state.userInfo["cases"]}</p>
                    <p className={s.midText}>Сторінок оброблено: {props.state.userInfo["pages"]}</p>
                </div>
                <div>{adminWindow()}</div>
            </div>
            <div className={s.body}>
                <div className={s.caseList}>
                    <div className={s.caseList_header}>
                        <div className={s.topSide}>
                            <div className={s.cell}>Акт</div>
                            <div className={s.cell}>Номер справи</div>
                            <div className={s.cell}>Адреса</div>
                            <div className={s.cell}>Відібрати</div>
                        </div>
                        <div className={s.bottomSide}>
                            {/*<div className={s.cell}>*/}
                            {/*    <input className={s.searchInput}*/}
                            {/*           type={'number'}*/}
                            {/*           value={props.state.filters.act}*/}
                            {/*           onChange={setFilterAct}/>*/}
                            {/*</div>*/}
                            {/*<div className={s.cell}>*/}
                            {/*    <input className={s.searchInput}*/}
                            {/*           type={'number'}*/}
                            {/*           value={props.state.filters.id}*/}
                            {/*           onChange={setFilterId}/>*/}
                            {/*</div>*/}
                            {/*<div className={s.cell}>*/}
                            {/*    <input className={s.searchInput}*/}
                            {/*           type={'text'}*/}
                            {/*           value={props.state.filters.adress}*/}
                            {/*           onChange={setFilterAdress}/>*/}
                            {/*</div>*/}
                            <div className={s.cell}>
                                <input  autoFocus
                                        className={s.searchInput}
                                       type={'number'}
                                       onChange={setFilterIndex}
                                       onKeyDown={addCaseToChoosen}
                                       value={props.state.filters.index}/>
                            </div>
                        </div>

                    </div>
                    <div className={s.content}>{content()}</div>
                    <div className={s.footer}>

                        <div>Усього справ на  {props.state.userInfo["operation"] === "stitcher" ? "розшивці : " :
                            (props.state.userInfo["operation"] === "scaner" ? "скануванні : " : "зшивці : ")}
                            {props.state.operator_cases.data.length}
                        </div>
                        <div>Відфільтровано : {filtredCasesCount}</div>
                        <div>Відображено: {casesToView}</div>
                    </div>
                </div>
                <div className={s.choosen}>
                    <Choosen
                        user={props.state.userInfo}
                        date={props.state.date}
                        isFetching={props.state.operator_cases.isFetching}
                        caseList={props.state.choosen_cases}
                        dispatch={props.dispatch}/>
                </div>
            </div>


        </div>
    )

}
export default WorkScreen