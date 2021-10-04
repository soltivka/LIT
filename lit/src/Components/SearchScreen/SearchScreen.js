import React from 'react';
import s from './SearchScreen.module.css';
import SearchString from "./SearchString/SearchString";
import {
    actFilter,
    adressFilter, applyFilters,
    idFilter,
    indexFilter, isDoneFilter,
    jointerFilter,
    scanerFilter,
    stitcherFilter
} from "../../Global/Functions";
import {
    set_filter_act_action,
    set_filter_adress_action,
    set_filter_id_action,
    set_filter_index_action,
    set_filter_isDone_action, set_filter_jointDate_action,
    set_filter_jointer_action,
    set_filter_scaner_action, set_filter_scanerFinishDate_action, set_filter_scanerStartDate_action,
    set_filter_stitchDate_action,
    set_filter_stitcher_action
} from "../../Global/Actions";

let scanNumberInvalidChecker = function (caseToCheck, caseList) {   /// проверялка индексов
    let actsWithEmptyFactPages = [];
    if (caseToCheck.scanNumber === "00000") {
        console.log("нулі в індексі" + caseToCheck.id)
        return true
    } else if(caseToCheck.scanNumber&&!caseToCheck.factPages){
        let alreadyMarkAsEmpty = actsWithEmptyFactPages.find((actNumber)=>{
            return actNumber===caseToCheck.act
        })
        if(!alreadyMarkAsEmpty){
            actsWithEmptyFactPages.push(caseToCheck.act)
            console.log('не підтягнуті сторінки в ' +caseToCheck.act + ' акті' )
        }
        return true
    }else{
        if (caseToCheck.scanNumber) {
            let sameScanNumberExist = caseList.find((anyCase) => {
                let sameScanNumber =  (anyCase.scanNumber === caseToCheck.scanNumber
                    && anyCase.scaner === caseToCheck.scaner
                    && anyCase.index !== caseToCheck.index)
                return sameScanNumber
            })
            if (sameScanNumberExist){
                console.log("однакові індекси: "+caseToCheck.id + " та " + sameScanNumberExist.id )
                return true
            }
        }else return false
    }
}

const SearchScreen = function (props) {

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
    const setFilterStitcher = function (event) {
        props.dispatch(set_filter_stitcher_action(event.target.value))
    }
    const setFilterStitchDate = function(event){
        props.dispatch(set_filter_stitchDate_action(event.target.value))
    }
    const setFilterScaner = function (event) {
        props.dispatch(set_filter_scaner_action(event.target.value))
    }
    const setFilterScanerDateStart = function(event){
        props.dispatch(set_filter_scanerStartDate_action(event.target.value))
    }
    const setFilterScanerDateFinish = function(event){
        props.dispatch(set_filter_scanerFinishDate_action(event.target.value))
    }
    const setFilterJointer = function (event) {
        props.dispatch(set_filter_jointer_action(event.target.value))
    }
    const setFilterJointDate = function(event){
        props.dispatch(set_filter_jointDate_action(event.target.value))
    }
    const setFilterIsDone = function (event) {
        props.dispatch(set_filter_isDone_action(event.target.value))
    }

    let maxCounter = 0;
    let suitableWithFilters = 0;
    let content = function (caseList) {
        if (props.state.casesForSearch.isFetching) {
            return (<div>LOADING ...................................</div>)
        }
        if (Array.isArray(caseList)) {
            return caseList.map((el) => {



                let filtredElement = applyFilters(props.state.filters, el)
                if (filtredElement) {
                    let indexIsWrong = scanNumberInvalidChecker(el,caseList)
                    suitableWithFilters++
                    if (maxCounter < 600) {
                        maxCounter++
                        return (
                            <SearchString el={el}
                                          key={el.index + '' + el.act}
                                          wrongIndex={indexIsWrong}/>
                        )
                    }

                }


            })
        }

    }


    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <div className={s.side}>
                    <div className={s.bigcell}>
                        <div className={s.cell}>Акт
                            <input type={'number'} className={s.input}
                                   value={props.state.filters.act} onChange={setFilterAct}/>
                        </div>
                        <div className={s.cell}>Дата отримання
                        </div>
                    </div>
                    <div className={s.bigcell}>
                        <div className={s.cell}>Справа №
                            <input type={'number'} className={s.input}
                                   value={props.state.filters.id} onChange={setFilterId}/>
                        </div>
                        <div className={s.cell}>Баркод
                            <input type={'number'} className={s.input}
                                   value={props.state.filters.index} onChange={setFilterIndex}/>
                        </div>
                    </div>
                    <div className={s.bigcell}>Адреса
                        <input type={'text'} className={s.input}
                               value={props.state.filters.adress} onChange={setFilterAdress}/>
                    </div>
                    <div className={s.bigcell}>
                        <div className={s.cell}>Розшивщик
                            <input type={'number'}
                                   className={s.input}
                                   value={props.state.filters.stitcher}
                                   onChange={setFilterStitcher}/>
                        </div>
                        <div className={s.cell}>Дата розшивки
                            <input type={'text'}
                                   className={s.input}
                                   value={props.state.filters.stitchDate}
                                   onChange={setFilterStitchDate}/>
                        </div>
                    </div>

                    <div className={s.bigcell}>
                        <div className={s.cell}>Сканувальник
                            <input type={'number'}
                                   className={s.input}
                                   value={props.state.filters.scaner}
                                   onChange={setFilterScaner}/>
                        </div>
                        <div className={s.cell}>Дата початку
                            <input type={'text'}
                                   className={s.input}
                                   value={props.state.filters.scanerDateStart}
                                   onChange={setFilterScanerDateStart}/>
                        </div>
                        <div className={s.cell}>Дата закінчення
                            <input type={'text'}
                                   className={s.input}
                                   value={props.state.filters.scanerDateFinish}
                                   onChange={setFilterScanerDateFinish}/>
                        </div>
                    </div>
                    <div className={s.bigcell}>
                        <div className={s.cell}>сторінок</div>

                        <div className={s.cell}>індекс</div>
                    </div>

                    <div className={s.bigcell}>
                        <div className={s.cell}>Зшивщик
                            <input type={'number'}
                                   className={s.input}
                                   value={props.state.filters.jointer}
                                   onChange={setFilterJointer}/>
                        </div>
                        <div className={s.cell}>Дата зшивки
                            <input type={'text'}
                                   className={s.input}
                                   value={props.state.filters.jointDate}
                                   onChange={setFilterJointDate}/>
                        </div>
                    </div>
                    <div className={s.bigcell}>
                        Дата здачі в архів
                        <input type={'text'}
                               className={s.input}
                               value={props.state.filters.isDone}
                               onChange={setFilterIsDone}/>
                    </div>


                </div>

            </div>
            <div className={s.body}>
                {content(props.state.casesForSearch.data)}
            </div>
            <div className={s.footer}>
                <div>Усього справ у списку: {props.state.casesForSearch.data.length}</div>
                <div>Підходить під фільтри: {suitableWithFilters}</div>
                <div>Відображується: {maxCounter}</div>
            </div>


        </div>
    )

}
export default SearchScreen