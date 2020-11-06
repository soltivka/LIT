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
                        <h4 className={`${s.text}`}>DIGITAL DOCS</h4>
                    </div>
                </div>
                <div className={s.navbar}>
                    <HeaderLink nav={'work'}
                                text={'Обработка'}
                                dispatch={props.dispatch}
                                state={props.state}/>
                    <HeaderLink nav={'userStats'}
                                text={'Статистика'}
                                dispatch={props.dispatch}
                                state={props.state}/>
                    <HeaderLink nav={'projectStats'}
                                text={'Проэкт'}
                                dispatch={props.dispatch}
                                state={props.state}/>
                    <HeaderLink nav={'search'}
                                text={'Поиск'}
                                dispatch={props.dispatch}
                                state={props.state}/>
                </div>
            </header>

        </div>
    );
}
export default Header