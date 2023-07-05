import React, {useEffect, useRef, useState} from 'react';
import s from './taskItem.module.scss';
import Task from "../../../types/Task";
import arrowRight from '../../../assets/img/arrowRight.svg';
import Checkbox from "../../SharedComponents/Checkbox/Checkbox";
import Store from "../../../store/store";
import {observer} from "mobx-react-lite";


type TaskItemProps = {
    task: Task,
    extraPadding?: boolean,
    isChecked: boolean,
    onCheck: (taskId: string, isChecked: boolean) => void;
}

const TaskItem = ({task, extraPadding, isChecked, onCheck}: TaskItemProps) => {
    const {setActiveTask, setTasksForDelete} = Store;
    const extraTasksRef = useRef<HTMLDivElement>(null);
    const arrowIconRef = useRef<HTMLImageElement>(null);

    const [childChecked, setChildChecked] = useState(isChecked);

    useEffect(() => {
        setChildChecked(isChecked);
    }, [isChecked]);

    const onChildCheck = (childChecked: boolean) => {
        setChildChecked(childChecked);
        task.subtasks?.forEach((subtask) => {
            onCheck(subtask.id, childChecked);
            setTasksForDelete(subtask.id);
        });

        setTasksForDelete(task.id);
    };

    const onToggleExtraTasks = () => {
        if (extraTasksRef.current && arrowIconRef.current) {
            const extraTasksElem = extraTasksRef.current;
            if (extraTasksElem.style.maxHeight) {
                extraTasksElem.style.maxHeight = '';
                arrowIconRef.current.style.transform = 'rotate(0)'
            } else {
                extraTasksElem.style.maxHeight = extraTasksElem.scrollHeight + 50 + 'px';
                arrowIconRef.current.style.transform = 'rotate(90deg)'
            }
        }

        setActiveTask(task.text, task.title)
    }

    return (
        <div className={`${s.itemWrapper} ${extraPadding ? s.extraPadding : ''}`}>
            <div className={s.item} onClick={onToggleExtraTasks}>
                <img ref={arrowIconRef} className={s.iconImg} src={arrowRight} alt="arrowUp"/>
                <div className={s.title}>{task.title}</div>
                <div className={s.checkbox}>
                    <Checkbox isChecked={childChecked} onCheck={() => onChildCheck(!childChecked)} id={task.id}
                              sm={extraPadding}/>
                </div>
            </div>
            <div className={s.extraTasks} ref={extraTasksRef}>
                {task.subtasks && task.subtasks.length > 0 && task.subtasks.map(task => {
                    return <TaskItem onCheck={onCheck}
                                     isChecked={childChecked} task={task} extraPadding key={task.id}/>
                })}
            </div>
        </div>
    );
};

export default observer(TaskItem);