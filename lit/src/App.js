import React from 'react';
import s from './App.module.css';
import Header from "./Components/Header/Header";
import WorkScreen from "./Components/WorkScreen/WorkScreen";
import AuthScreen from "./Components/AuthScreen/AuthScreen";
import UserScreen from "./Components/UserScreen/UserScreen";
import ProjectScreen from "./Components/ProjectScreen/ProjectScreen";
import SearchScreen from "./Components/SearchScreen/SearchScreen";
import HandOverScreen from "./Components/HandOverScreen/HandOverScreen";


function App(props) {

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
        }else if (props.state.currentNav === 'userStats') {
            return (
                <div>
                    <UserScreen
                        dispatch={props.dispatch}
                        state={props.state}/>
                </div>
            )
        }else if (props.state.currentNav === 'projectStats') {
            return (
                <div>
                    <ProjectScreen
                        dispatch={props.dispatch}
                        state={props.state}/>
                </div>
            )
        }
        else if (props.state.currentNav === 'search') {
            return (
                <div>
                    <SearchScreen
                        dispatch={props.dispatch}
                        state={props.state}/>
                </div>
            )
        }
        else if (props.state.currentNav === 'handOver') {
            return (
                <div>
                    <HandOverScreen
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
