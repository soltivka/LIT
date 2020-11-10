import React from 'react';
import s from './StatsScreen.module.css';


const StatsScreen = function (props) {
    let content=function(){
        for (let actName in props.state.projectStats.allActsStats) {
            console.log(actName)
        }
    }




    return (
        <div className={s.wrapper}>{content()}</div>
    )

}
export default StatsScreen