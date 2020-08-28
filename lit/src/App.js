import React from 'react';
import logo from './logo.svg';
import s from './App.module.css';
import Header from "./Components/Header/Header";
import CasesBlock from "./Components/CasesBlock/CasesBlock";
import {HashRouter, Route} from "react-router-dom";
import JointScreen from "./Components/JointScreen/JointScreen";


function App(props) {

   let setCurrentNavScreen = function (){
        if (props.state.main.currentNav ==='stitch'){
            console.log(props.state.main.currentNav)
            return(
                <div>
                <JointScreen dispatch={props.dispatch}
                             database={props.state.main.database}/>
            </div>
            )
        }else if (props.state.main.currentNav ==='scan'){
            console.log(props.state.main.currentNav)
           return(
               <div>
                   сканировка
               </div>
           )
       }else if (props.state.main.currentNav ==='joint'){
            console.log(props.state.main.currentNav)
            return(
                <div>
                    расшивка
                </div>
            )
        }
   };


    return (
        <div className={s.App}>
            <Header dispatch={props.dispatch}
                state={props.state.header}
            />

            <div>
                {setCurrentNavScreen()}
            </div>
        </div>
    );
}

export default App;
