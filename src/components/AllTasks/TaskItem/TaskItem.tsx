import React, {useRef, useState} from 'react';
import s from './taskItem.module.scss';
import Task from "../../../types/Task";
import arrowRight from '../../../assets/img/arrowRight.svg';
import Checkbox from "../../SharedComponents/Checkbox/Checkbox";


type TaskItemProps = {
    task: Task,
    extraPadding?: boolean,
    isCheckedParent?: boolean
}

const TaskItem = ({task, extraPadding, isCheckedParent}: TaskItemProps) => {
    const [isChecked, setIsChecked] = useState(isCheckedParent ? isCheckedParent : false);
    const extraTasksRef = useRef<HTMLDivElement>(null);
    const arrowIconRef = useRef<HTMLImageElement>(null);

    const onCheck = () => {
        setIsChecked(!isChecked);
    }

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

    }

    return (
        <div className={`${s.itemWrapper} ${extraPadding ? s.extraPadding : ''}`}>
            <div className={s.item} onClick={onToggleExtraTasks}>
                <img ref={arrowIconRef} className={s.iconImg} src={arrowRight} alt="arrowUp"/>
                <div className={s.title}>{task.title}</div>
                <div className={s.checkbox}>
                    <Checkbox isChecked={isChecked} onCheck={onCheck} id={task.id} sm={extraPadding}/>
                </div>
            </div>
            <div className={s.extraTasks} ref={extraTasksRef}>
                {task.subtasks && task.subtasks.length && task.subtasks.map(task => {
                    return <TaskItem isCheckedParent={isChecked} task={task} extraPadding key={task.id}/>
                })}
            </div>
        </div>
    );
};

export default TaskItem;