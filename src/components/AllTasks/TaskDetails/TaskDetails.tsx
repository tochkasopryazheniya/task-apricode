import React from 'react';
import s from './taskDetails.module.scss';
import Store from "../../../store/store";
import {observer} from "mobx-react-lite";

const TaskDetails = () => {
    const {activeTask} = Store;
    return (
        <>
            {activeTask.text && activeTask.title ? (
                <>
                    <div className={s.title}>{activeTask.title}</div>
                    <div className={s.text}>{activeTask.text}</div>
                </>
            ) : (
                <h1 className={s.emptyTitle}>Выберите задачу</h1>
            )}
        </>
    );
};

export default observer(TaskDetails);