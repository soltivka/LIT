import React from 'react';
import s from './HandOverScreen.module.css';
import {actFilter, adressFilter, idFilter, indexFilter} from "../../Global/Functions";
import {
    post_done_cases_action,
    push_filtredByIndex_to_handOverCasesList_action,
    set_filter_index_action
} from "../../Global/Actions";
import SearchString from "../SearchScreen/SearchString/SearchString";

const HandOverScreen = function (props) {

    const setFilterIndex = function (event) {
        props.dispatch(set_filter_index_action(event.target.value))
    }
    const pushCaseToHandOverList = function (event) {
        if (event.key==="Enter"){
            props.dispatch(push_filtredByIndex_to_handOverCasesList_action())
        }
        if(event.key===","){event.preventDefault()}
    }
    const post_done_cases=function(event){
        props.dispatch(post_done_cases_action())
    }

    let handOverCaseListLength = 0;
    let content = function (caseList) {
        if (props.state.casesForSearch.isFetching) {
            return (<div>LOADING ...................................</div>)
        }
        if (Array.isArray(caseList)) {
            return caseList.map((el) => {
                handOverCaseListLength++;
                    return (
                        <SearchString el={el}
                                      key={el.index + '' + el.act}/>
                    )
            })
        } else console.log(" caseList HandOverScreen Нет дел для отображения")

    }

    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <div className={s.side}>
                    <div className={s.bigcell}>
                        <div className={s.cell}>Акт

                        </div>
                        <div className={s.cell}>Дата получения

                        </div>
                    </div>
                    <div className={s.bigcell}>
                        <div className={s.cell}>Дело
                        </div>
                        <div className={s.cell}>Штрих-код

                        </div>
                    </div>
                    <div className={s.bigcell}>Адрес
                    </div>
                    <div className={s.bigcell}>
                        <div className={s.cell}>Расшивщик
                        </div>
                        <div className={s.cell}>дата расшивки
                        </div>
                    </div>

                    <div className={s.bigcell}>
                        <div className={s.cell}>Сканировщик
                        </div>
                        <div className={s.cell}>Дата начала
                        </div>
                        <div className={s.cell}>Дата окончания
                        </div>
                    </div>
                    <div className={s.bigcell}>
                        <div className={s.cell}>страниц отсканено</div>
                        <div className={s.cell}>страниц ожидалось</div>
                        <div className={s.cell}>индекс</div>
                    </div>

                    <div className={s.bigcell}>
                        <div className={s.cell}>Сшивщик
                        </div>
                        <div className={s.cell}>Дата сшивки
                        </div>
                    </div>
                    <div className={s.bigcell}>
                        Охрана отмена
                    </div>
                </div>
                <div className={s.side}>
                    <input className={s.input}
                           value={props.state.filters.index}
                           onChange={setFilterIndex}
                           onKeyDown={pushCaseToHandOverList}/>
                </div>

            </div>
            <div className={s.body}>
                {content(props.state.casesForHandOver)}
            </div>
            <div className={s.footer}>
                <div>Всего дел на проэкте: {props.state.casesForSearch.data.length}</div>
                <div>Отобрано: {handOverCaseListLength}</div>
                <div className={s.handOver} onClick={post_done_cases}>Сдать в архив</div>
            </div>


        </div>
    )

}
export default HandOverScreen