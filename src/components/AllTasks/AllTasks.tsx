import React from 'react';
import s from './allTasks.module.scss';
import TaskItem from "./TaskItem/TaskItem";
import Task from "../../types/Task";
import {v4} from 'uuid';

const tasksData: Task[] = [
    {
        id: v4(),
        text: 'Пройтись по всем аспектам Frontend разработки',
        title: 'Frontend',
        subtasks: [{id: v4(), title: 'Изучить React', text: 'Пройтись по всем аспектам React'}, {
            id: v4(),
            title: 'Изучить Mobx',
            text: 'Понять суть State Manager Mobx',
            subtasks: [{id: v4(), title: 'Изучить Actions', text: 'Понять как работаю actions в mobx'}]
        }]
    },
    {id: v4(), title: 'Вторая задача', text: 'Sample text'},
    {id: v4(), title: 'Третья задача',text: 'Sample text'}
]

const AllTasks = () => {
    return (
        <div className={s.tasksWrapper}>
            <div className={s.tasks}>
                {tasksData.map(item => {
                    return <TaskItem task={item} key={item.id}/>
                })}
            </div>
            <div className={s.taskText}>

            </div>
        </div>
    );
};

export default AllTasks;