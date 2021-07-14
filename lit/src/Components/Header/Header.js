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
                                text={'Обробка'}
                                dispatch={props.dispatch}
                                state={props.state}
                                onlyAdmin={false}/>
                    <HeaderLink nav={'userStats'}
                                text={'Користувачі'}
                                dispatch={props.dispatch}
                                state={props.state}
                                onlyAdmin={true}/>
                    <HeaderLink nav={'projectSettings'}
                                text={'Проєкт'}
                                dispatch={props.dispatch}
                                state={props.state}
                                onlyAdmin={true}/>
                    <HeaderLink nav={'search'}
                                text={'Пошук'}
                                dispatch={props.dispatch}
                                state={props.state}
                                onlyAdmin={false}/>
                    <HeaderLink nav={'handOver'}
                                text={'Сдати справи'}
                                dispatch={props.dispatch}
                                state={props.state}
                                onlyAdmin={true}/>
                    <HeaderLink nav={'projectStats'}
                                text={'Статистика проєкту'}
                                dispatch={props.dispatch}
                                state={props.state}
                                onlyAdmin={true}/>
                    <HeaderLink nav={'userStats2'}
                                text={'Статистика користувачів по дням'}
                                dispatch={props.dispatch}
                                state={props.state}
                                onlyAdmin={true}/>
                    <HeaderLink nav={'demoScreen'}
                                text={'Демонстрація'}
                                dispatch={props.dispatch}
                                state={props.state}
                                onlyAdmin={true}/>
                </div>
            </header>

        </div>
    );
}
export default Header