import React from 'react';
import s from './App.module.css';
import Header from "./Components/Header/Header";
import JointScreen from "./Components/JointScreen/JointScreen";
import ScanScreen from "./Components/ScanScreen/ScanScreen";
import StitchScreen from "./Components/StitchScreen/StitchScreen";
import AuthScreen from "./Components/AuthScreen/AuthScreen";


function App(props) {

    let setCurrentNavScreen = function () {
        if (props.state.main.currentNav === 'stitch') {
            console.log(props.state.main.currentNav)
            return (
                <div>
                    <StitchScreen dispatch={props.dispatch}
                                  database={props.state.main.database}
                                  state={props.state}/>
                </div>
            )
        } else if (props.state.main.currentNav === 'scan') {
            console.log(props.state.main.currentNav)
            return (
                <div>
                    <ScanScreen
                        dispatch={props.dispatch}
                        state={props.state}/>
                </div>
            )
        } else if (props.state.main.currentNav === 'joint') {
            console.log(props.state.main.currentNav)
            return (
                <div>
                    <JointScreen
                        dispatch={props.dispatch}
                        state={props.state}/>
                </div>
            )
        } else if (props.state.main.currentNav === 'auth') {
            console.log(props.state.main.currentNav)
            return (
                <div>
                    <AuthScreen
                        dispatch={props.dispatch}
                        state={props.state}/>

                </div>
            )
        }
    };


    return (
        <div className={s.App}>
            <Header dispatch={props.dispatch}
                    state={props.state}
            />

            <div>
                {setCurrentNavScreen()}
            </div>
        </div>
    );
}

export default App;
