import React from 'react';
import s from './App.module.css';
import Header from "./Components/Header/Header";
import WorkScreen from "./Components/WorkScreen/WorkScreen";
import AuthScreen from "./Components/AuthScreen/AuthScreen";


function App(props) {
    console.log(props)

    let setCurrentNavScreen = function () {
        if (props.state.currentNav === 'work') {
            return (
                <div>
                    <WorkScreen dispatch={props.dispatch}
                                  state={props.state}/>
                </div>
            )

        } else if (props.state.currentNav === 'auth') {
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
