import React from 'react';
import s from './JointScreen.module.css';
import Choosen from "../Choosen/Choosen";
import CaseList from "../CaseList/CaseList";

const JointScreen = function (props) {


    let getJointElement = (el) => {
        if (el.jointer === 0 && el.scaner === 0 && el.stitcher === 0 && el.visible === true) { //filter by case state
            if(props.state.main.actFilter==='' && props.state.main.caseFilter===''){return el}else                              //filter by filters :)
                if(props.state.main.actFilter==el.act||props.state.main.caseFilter==el.number){return el}
        } else return false
    };
    let getJointArray = function(){
        let jointArray=[];
        for (let i=0;i<props.state.main.database.length;i++){
            let jointElement=getJointElement(props.state.main.database[i]);
            if(jointElement!==false){
                jointArray.push(jointElement)
            }

        }
        return jointArray
    };


    return (
        <div className={s.wrapper}>
            <div className={s.jointListWrapper}>
                <CaseList dispatch={props.dispatch}
                          state={props.state}
                          content={getJointArray()}
                />
            </div>

            <div className={s.choosenWrapper}>
                <Choosen
                    dispatch={props.dispatch}
                    state={props.state}
                />
            </div>


        </div>
    );
}
export default JointScreen