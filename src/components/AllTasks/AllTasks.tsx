import React, {useEffect, useState} from 'react';
import s from './allTasks.module.scss';
import TaskItem from "./TaskItem/TaskItem";
import TaskDetails from "./TaskDetails/TaskDetails";
import {observer} from "mobx-react-lite";
import Store from "../../store/store";
import Button from "../SharedComponents/Button/Button";
import Modal from "./Modal/Modal";
import {showSuccess} from "../../utils/notifications";
import Task from "../../types/Task";



const AllTasks = () => {
    const {allTasks, tasksForDelete, deleteSelectedTasks, setAllTasks, searchValue} = Store;
    const initialCheckedState: { [key: string]: boolean } = {};
    const [checkedState, setCheckedState] = useState(initialCheckedState);
    const [isShownModal, setIsShownModal] = useState(false);

    const onShowModal = () => {
        setIsShownModal(true)
    }

    const onHideModal = () => {
        setIsShownModal(false);
    }


    const onCheck = (taskId: string, isChecked: boolean) => {
        setCheckedState((prevState) => ({
            ...prevState,
            [taskId]: isChecked,
        }));
    };

    const onDeleteTasks = () => {
        deleteSelectedTasks();
        showSuccess('Выбранные задачи успешно удалены');
    }

    const filterTasks = (items: Task[], searchText: string): Task[] => {
        const filteredItems: Task[] = [];

        items.forEach(item => {
            if (item.title.toLowerCase().includes(searchText.toLowerCase())) {
                filteredItems.push(item);
            }

            if (item.subtasks && item.subtasks.length) {
                const filteredSubtasks = filterTasks(item.subtasks, searchText);

                if (filteredSubtasks.length > 0) {
                    filteredItems.push(...filteredSubtasks);
                }
            }
        });

        return filteredItems;
    };

    const renderTasks = () => {
        if(searchValue) {
            const filteredTasks: Task[] = filterTasks(allTasks, searchValue);
            if(!filteredTasks.length) {
                return <div>Задача не найдена</div>
            }

            return filteredTasks.map(item => {
                return <TaskItem isChecked={checkedState[item.id] || false} onCheck={onCheck} task={item}
                                 key={item.id}/>
            })
        }else {
            return allTasks.map(item => {
                return <TaskItem isChecked={checkedState[item.id] || false} onCheck={onCheck} task={item}
                                 key={item.id}/>
            })
        }
    }


    useEffect(() => {
        setAllTasks();
    }, [])

    return (
        <>
            <Modal isShown={isShownModal} onHide={onHideModal}/>
            <div className={s.tasksWrapper}>
                <div className={s.tasks}>
                    {renderTasks()}
                </div>
                <div className={s.tasksInfo}>
                    <div className={s.btnBlock}>
                        <Button onClick={onShowModal}>Добавить задачу</Button>
                        {tasksForDelete.length ? <Button onClick={onDeleteTasks} red>Удалить</Button> : null}
                    </div>
                    <div className={s.taskText}>
                        <TaskDetails/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default observer(AllTasks);