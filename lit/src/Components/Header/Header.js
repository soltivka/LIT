import React from 'react';
import s from './Header.module.css';
import headerIcon from "../../img/logo.png"
import HeaderLink from "./HeaderLink/HeaderLink";

const Header = function (props) {
    return (
        <div className={s.header_wrapper}>
            <header className={s.header_container}>
                <div className={s.header_leftSide}>

                    <img className={`${s.icon} ${s.hoverElement}`}
                         src={headerIcon}/>

                    <div>
                        <h4 className={`${s.headerText}`}>DIGITAL DOCS</h4>
                    </div>
                </div>
                <div className={s.navbar}>
                    <HeaderLink nav={'work'}
                                text={'Обработка'}
                                dispatch={props.dispatch}
                                state={props.state}
                                onlyAdmin={false}/>
                    <HeaderLink nav={'userStats'}
                                text={'Користувачі'}
                                dispatch={props.dispatch}
                                state={props.state}
                                onlyAdmin={true}/>
                    <HeaderLink nav={'projectSettings'}
                                text={'Проэкт'}
                                dispatch={props.dispatch}
                                state={props.state}
                                onlyAdmin={true}/>
                    <HeaderLink nav={'search'}
                                text={'Поиск'}
                                dispatch={props.dispatch}
                                state={props.state}
                                onlyAdmin={false}/>
                    <HeaderLink nav={'handOver'}
                                text={'Сдать дела'}
                                dispatch={props.dispatch}
                                state={props.state}
                                onlyAdmin={true}/>
                    <HeaderLink nav={'projectStats'}
                                text={'Статистика проэкта'}
                                dispatch={props.dispatch}
                                state={props.state}
                                onlyAdmin={true}/>
                    <HeaderLink nav={'userStats2'}
                                text={'Статистика по дням'}
                                dispatch={props.dispatch}
                                state={props.state}
                                onlyAdmin={true}/>
                    <HeaderLink nav={'userStatsByActs'}
                                text={'Статистика по актам'}
                                dispatch={props.dispatch}
                                state={props.state}
                                onlyAdmin={true}/>
                </div>
            </header>

        </div>
    );
}
export default Header