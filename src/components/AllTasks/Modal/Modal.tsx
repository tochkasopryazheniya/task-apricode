import React, {useState} from 'react';
import ModalWindow from "../../SharedComponents/ModalWindow/ModalWindow";
import s from './modal.module.scss';
import Button from "../../SharedComponents/Button/Button";
import Task from "../../../types/Task";
import Store from "../../../store/store";
import useInput from "../../../hooks/useInput";
import useTextarea from "../../../hooks/useTextarea";
import {v4} from "uuid";
import {showSuccess} from "../../../utils/notifications";
import Input from "../../SharedComponents/Input/Input";

type ModalTypeProps = {
    isShown: boolean,
    onHide: () => void
}

const flattenTasks = (tasks: Task[]): Task[] => {
    const flattenedTasks: Task[] = [];

    const flatten = (task: Task) => {
        flattenedTasks.push(task);

        if (task.subtasks && task.subtasks.length) {
            task.subtasks.forEach(flatten);
        }
    }

    tasks.forEach(flatten);

    return flattenedTasks;
}

const Modal = ({isShown, onHide}: ModalTypeProps) => {
    const {allTasks, addNewTask} = Store;
    const flattenTasksArr = flattenTasks(allTasks);
    const [selectedOption, setSelectedOption] = useState('0');

    const input = useInput({initialValue: ''});
    const textarea = useTextarea({initialValue: ''})

    const onChangeSelectedOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    }

    const onAddNewTask = () => {
        const subTask = {title: input.value, text: textarea.value, id: v4()};
        addNewTask(selectedOption, subTask);
        input.reset();
        textarea.reset();
        setSelectedOption('0');
        onHide();
        showSuccess('Задача успешно добавлена');
    }


    return (
        <ModalWindow isShown={isShown} onHide={onHide} header='Добавить задачу'>
            <div className={s.modal}>
                <label className={s.label} htmlFor="select">Выберите подзадачу или оставьте самый верхний уровень</label>
                <select value={selectedOption} onChange={onChangeSelectedOption} className={s.select} id='select'>
                    <option value="0">Самый верхний уровень</option>
                    {flattenTasksArr.map(task => {
                        return <option key={task.id} value={task.id}>{task.title}</option>
                    })}
                </select>

                <div className={s.input}>
                    <Input value={input.value} onChange={input.onChange} placeholder='Введите название задачи'/>
                </div>
                <textarea value={textarea.value} onChange={textarea.onChange} className={s.textarea} placeholder='Введите текст задачи'></textarea>
                <Button onClick={onAddNewTask}>Добавить</Button>
            </div>
        </ModalWindow>
    );
};

export default Modal;