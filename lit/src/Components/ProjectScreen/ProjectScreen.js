import React from 'react';
import s from './ProjectScreen.module.css';
import {
    post_deleteUser_action,
    post_newUser_action,
    reset_userStats_action,
    set_newUser_id_action, set_newUser_isAdmin_action,
    set_newUser_name_action, set_newUser_operation_action,
    set_newUser_userhash_action, set_userToDelete_action
} from "../../Global/Actions";

const ProjectScreen = function (props) {
    const resetUserStats=function() {
        props.dispatch(reset_userStats_action())
    }
    const setName=function(event){
        props.dispatch(set_newUser_name_action(event.target.value))
    }
    const setUserhash=function(event){
        props.dispatch(set_newUser_userhash_action(event.target.value))
    }
    const setId=function(event){
        props.dispatch(set_newUser_id_action(event.target.value))
    }
    const setOperation=function(event){
        props.dispatch(set_newUser_operation_action(event.target.value))
    }
    const setIsAdmin=function(event){
        props.dispatch(set_newUser_isAdmin_action(event.target.value))
    }
    const postNewUser=function(){
        props.dispatch(post_newUser_action())
    }
    const setUserToDelete=function(event){
    props.dispatch(set_userToDelete_action(event.target.value))
    }
    const deleteUser=function(){
        props.dispatch(post_deleteUser_action())
    }


    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <div className={s.container_header}>Создать нового пользователя</div>

                <div className={s.cell}>
                    <div className={s.smallCell}>Имя пользователя</div>
                    <div className={s.smallCell}>
                        <input type={'text'} value={props.state.newUser.name} onChange={setName}/>
                    </div>
                </div>
                <div className={s.cell}>
                    <div className={s.smallCell}>Штрих-код</div>
                    <div className={s.smallCell}>
                        <input type={'text'} value={props.state.newUser.userhash} onChange={setUserhash}/>
                    </div>

                </div>
                <div className={s.cell}>
                    <div className={s.smallCell}> Номер пользователя</div>
                    <div className={s.smallCell}>
                        <input type={'number'} value={props.state.newUser.id} onChange={setId}/>
                    </div>
                </div>

                <div className={s.cell}>
                    <div className={s.smallCell}> Процесс</div>
                    <div className={s.smallCell}>
                        <select className={s.select} value={props.state.newUser.operation} name="operation" onChange={setOperation}>
                            <option value={"stitcher"}>Расшивщик</option>
                            <option value={"scaner"}>Сканировщик</option>
                            <option value={"jointer"}>Сшивщик</option>
                        </select>
                    </div>
                </div>
                <div className={s.cell}>
                    <div className={s.smallCell}> Права администратора: </div>
                    <div className={s.smallCell}>
                        ДА<input type={'checkbox'} value={!props.state.newUser.isAdmin} name={'isAdmin'} onChange={setIsAdmin}/>
                    </div>
                </div>

                <div className={s.addNewUser} onClick={postNewUser}> Добавить пользователя</div>

            </div>
            <div className={s.button}
            onDoubleClick={resetUserStats}>Сбросить статистику всех пользователей
            </div>

            <div className={s.container}>
                <div className={s.container_header}> Удалить пользователя</div>
                <div className={s.cell}>
                    <div className={s.smallCell}> Номер пользователя: </div>
                    <div className={s.smallCell}>
                        <input type={'text'} value={props.state.userToDelete} onChange={setUserToDelete}/>
                    </div>
                </div>
                <div className={s.button}
                     onClick={deleteUser}>Удалить пользователя.
                </div>
            </div>
        </div>
    )

}
export default ProjectScreen