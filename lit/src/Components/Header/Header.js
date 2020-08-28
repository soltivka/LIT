import React from 'react';
import s from './Header.module.css';
import headerIcon from "../../img/logo.png"
import {NavLink} from "react-router-dom";
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
                    <HeaderLink nav={'stitch'}
                                text={'Сшивка'}
                                dispatch={props.dispatch}
                                state={props.state}/>
                    <HeaderLink nav={'scan'}
                                text={'Сканировка'}
                                dispatch={props.dispatch}
                                state={props.state}/>
                    <HeaderLink nav={'joint'}
                                text={'Расшивка'}
                                dispatch={props.dispatch}
                                state={props.state}/>
                </div>
            </header>

        </div>
    );
}
export default Header