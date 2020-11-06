import React from 'react';
import s from './SearchScreen.module.css';
import SearchString from "./SearchString/SearchString";
import {actFilter, adressFilter, idFilter, indexFilter} from "../../Global/Functions";
import {
    change_admin_operation_action,
    set_filter_act_action,
    set_filter_adress_action,
    set_filter_id_action,
    set_filter_index_action
} from "../../Global/Actions";

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


    let maxCounter = 0;
    let suitableWithFilters=0;
    let content = function(caseList){
        if(props.state.casesForSearch.isFetching){
                    return(<div>LOADING ...................................</div>)
        }
        if(Array.isArray(caseList)){
           return caseList.map((el)=>{

               let filtredElement = indexFilter(props.state.filters.index,el);
               filtredElement = adressFilter(props.state.filters.adress,filtredElement);
               filtredElement = idFilter(props.state.filters.id,filtredElement);
               filtredElement = actFilter(props.state.filters.act,filtredElement);
               if(filtredElement){
                   suitableWithFilters++
                   if(maxCounter<500){
                       maxCounter++
                       return(
                           <SearchString el={el}
                                         key={el.index+''+el.act}/>
                       )}

               }


           })
        }else console.log(caseList)

    }
    let defineClass = function () {
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
                        <div className={s.cell}>Дата получения
                            <input type={'number'} className={s.input}/>
                        </div>
                    </div>
                    <div className={s.bigcell}>
                        <div className={s.cell}>Дело
                            <input type={'number'} className={s.input}
                                   value={props.state.filters.id} onChange={setFilterId}/>
                        </div>
                        <div className={s.cell}>Штрих-код
                            <input type={'number'} className={s.input}
                                   value={props.state.filters.index} onChange={setFilterIndex}/>
                        </div>
                    </div>
                    <div className={s.bigcell}>Адрес
                        <input type={'text'} className={s.input}
                               value={props.state.filters.adress} onChange={setFilterAdress}/>
                    </div>
                    <div className={s.bigcell}>
                        <div className={s.cell}>Расшивщик
                            <input type={'number'} className={s.input}/>
                        </div>
                        <div className={s.cell}>дата расшивки
                            <input type={'number'} className={s.input}/>
                        </div>
                    </div>

                    <div className={s.bigcell}>
                        <div className={s.cell}>Сканировщик
                            <input type={'number'} className={s.input}/>
                        </div>
                        <div className={s.cell}>Дата начала
                            <input type={'number'} className={s.input}/>
                        </div>
                        <div className={s.cell}>Дата окончания
                            <input type={'number'} className={s.input}/>
                        </div>
                    </div>
                    <div className={s.bigcell}>
                        <div className={s.cell}>страниц отсканено</div>
                        <div className={s.cell}>страниц ожидалось</div>
                        <div className={s.cell}>индекс</div>
                    </div>

                    <div className={s.bigcell}>
                        <div className={s.cell}>Сшивщик
                            <input type={'number'} className={s.input}/>
                        </div>
                        <div className={s.cell}>Дата сшивки
                            <input type={'number'} className={s.input}/>
                        </div>
                    </div>
                    <div className={s.bigcell}>
                        Дата сдачи
                    </div>


                </div>

            </div>
            <div className={s.body}>
                {content(props.state.casesForSearch.data)}
            </div>
            <div className={s.footer}>
                <div>Vsego del prinyato: {props.state.casesForSearch.data.length}</div>
                <div>podhodit pod filtPbI: {suitableWithFilters}</div>
                <div> otobrajaetsa : {maxCounter}</div>
            </div>


        </div>
    )

}
export default SearchScreen