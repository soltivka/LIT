import React from 'react';
import s from './App.module.css';
import Header from "./Components/Header/Header";
import WorkScreen from "./Components/WorkScreen/WorkScreen";
import AuthScreen from "./Components/AuthScreen/AuthScreen";
import UserStatsScreen from "./Components/UserStatsScreen/allUsersInfo";
import ProjectScreen from "./Components/ProjectScreen/ProjectScreen";
import SearchScreen from "./Components/SearchScreen/SearchScreen";
import HandOverScreen from "./Components/HandOverScreen/HandOverScreen";
import ProjectStatsScreen from "./Components/ProjectStatsScreen/ProjectStatsScreen";
import UserStatScreen from "./Components/UserStatScreen/UserStatScreen";
import UserStatByActs from "./Components/UserStatsByActs/UserStatsByActs";
import DemoScreen from "./Components/DemoScreen/DemoScreen"

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
                <div className={s.wrapper}>
                    <AuthScreen
                        dispatch={props.dispatch}
                        state={props.state}/>
                </div>
            )
        } else if (props.state.currentNav === 'userStats') {
            return (
                <div>
                    <UserStatsScreen
                        dispatch={props.dispatch}
                        state={props.state}/>
                </div>
            )
        } else if (props.state.currentNav === 'projectSettings') {
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
        else if (props.state.currentNav === 'projectStats') {
            return (
                <div>
                    <ProjectStatsScreen
                        dispatch={props.dispatch}
                        state={props.state}/>
                </div>
            )
        }
        else if (props.state.currentNav === 'userStats2') {
            return (
                <div>
                    <UserStatScreen
                        dispatch={props.dispatch}
                        state={props.state}/>
                </div>
            )
        }
        else if (props.state.currentNav === 'userStatsByActs') {
            return (
                <div>
                    <UserStatByActs
                        dispatch={props.dispatch}
                        state={props.state}/>
                </div>
            )
        }
        else if (props.state.currentNav === 'demoScreen') {
            return (
                <div>
                    <DemoScreen
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

            <div className={s.bg_image}>
                {setCurrentNavScreen()}
            </div>
        </div>
    );
}

export default App;
