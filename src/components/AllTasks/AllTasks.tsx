import React, {useState} from 'react';
import s from './allTasks.module.scss';
import TaskItem from "./TaskItem/TaskItem";
import TaskDetails from "./TaskDetails/TaskDetails";
import {observer} from "mobx-react-lite";
import Store from "../../store/store";
import Button from "../SharedComponents/Button/Button";


const AllTasks = () => {
    const {allTasks, tasksForDelete, deleteSelectedTasks} = Store;
    const initialCheckedState: { [key: string]: boolean } = {};
    const [checkedState, setCheckedState] = useState(initialCheckedState);


    const onCheck = (taskId: string, isChecked: boolean) => {
        setCheckedState((prevState) => ({
            ...prevState,
            [taskId]: isChecked,
        }));
    };


    return (
        <div className={s.tasksWrapper}>
            <div className={s.tasks}>
                {allTasks.map(item => {
                    return <TaskItem isChecked={checkedState[item.id] || false} onCheck={onCheck} task={item}
                                     key={item.id}/>
                })}
            </div>
            <div className={s.tasksInfo}>
                <div className={s.btnBlock}>
                    <Button onClick={() => console.log('add')}>Добавить задачу</Button>
                    {tasksForDelete.length ? <Button onClick={deleteSelectedTasks} red>Удалить</Button> : null}
                </div>
                <div className={s.taskText}>
                    <TaskDetails/>
                </div>
            </div>
        </div>
    );
};

export default observer(AllTasks);