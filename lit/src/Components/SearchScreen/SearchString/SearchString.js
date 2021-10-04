import React from 'react';
import s from './SearchString.module.css';




const SearchString = function (props) {
    let el=props.el
    let defineClassString=function(el){
        if(el.stitcher===''){return s.wrapper_new}
        else if(el.stitcher!==''&&el.scaner===''){return s.wraper_stitch}
        else if(el.scaner!==''&&el.scanDateFinish===''){return s.wrapper_scanStart}
        else if(el.scanDateFinish!==''&&el.jointer===''){return s.wrapper_scanFinish}
        else if(el.jointer!==''&&el.isDoneDate===''){return s.wrapper_joined}
        else if(el.isDoneDate!==''){return s.wrapper_isDone}
    }
    let defineClassCell=function(indexIsWrong){
        if(indexIsWrong){return s.indexIsWrong}else return ''
    }

    return (
        <div className={defineClassString(el)}>
            <div className={s.bigcell}>
                <div className={s.cell}>{el.act}</div>
                <div className={s.cell}>{el.incomeDate}</div>
            </div>
            <div className={s.bigcell}>
                <div className={s.cell}>{el.id}</div>
                <div className={s.cell}>{el.index}</div>
            </div>
            <div className={s.bigcell}>
                <div className={s.cell}>
                    {el.street + '  '+ el.adress}
                </div>
            </div>
            <div className={s.bigcell}>
                <div className={s.cell}>{el.stitcher}</div>
                <div className={s.cell}>{el.stitchDate}</div>
            </div>

            <div className={s.bigcell}>
                <div className={s.cell}>{el.scaner}</div>
                <div className={s.cell}>{el.scanDateStart}</div>
                <div className={s.cell}>{el.scanDateFinish}</div>
            </div>
            <div className={s.bigcell}>
                <div className={s.cell}>{el.factPages}</div>
                <div className={s.cell +' '+defineClassCell(props.wrongIndex)}>{el.scanNumber}</div>
            </div>

            <div className={s.bigcell}>
                <div className={s.cell}>{el.jointer}</div>
                <div className={s.cell}>{el.jointDate}</div>
            </div>
            <div className={s.bigcell}>
                {el.isDoneDate}
            </div>


        </div>
    );
}
export default SearchString