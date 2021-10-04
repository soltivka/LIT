import React from 'react';
import s from './CaseString.module.css';
import AddButton from "../addButton/AddButton";

const CaseString = function (props) {
    let el= props.datacase;
    let adminButton=function(){
        if(props.user.isAdmin){
        return(<div className={s.cell}>
            <AddButton dispatch={props.dispatch}
                       el={props.datacase}/>
        </div>
        )}else return(<div className={s.cell}/>)
    }
    let defineClass = function(){
        if(el.scanDateFinish===''&&el.scanDateStart){
            return s.wrapperOnScan
        }else return s.wrapper
    }

    return (
        <div className={defineClass()}>
            <div className={s.cell}>{el.act}</div>
            <div className={s.cell}>{el.id}</div>
            <div className={s.cell}>{el.street +'  '+ el.adress}</div>
            {adminButton()}

        </div>
    )

}
export default CaseString