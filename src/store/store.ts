import {makeAutoObservable} from "mobx";
import Task from "../types/Task";
import {v4} from "uuid";
import React from "react";

type ActiveTask = {
    title: string,
    text: string
}

class Store {
    activeTask: ActiveTask = {title: '', text: ''};
    allTasks: Task[] = [];
    tasksForDelete: string[] = [];
    searchValue = '';


    setAllTasks = () => {
        const tasksInLocalStorage = localStorage.getItem('tasks');

        if (tasksInLocalStorage) {
            this.allTasks = JSON.parse(tasksInLocalStorage);
        } else {
            this.allTasks = [
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
                {id: v4(), title: 'Третья задача', text: 'Sample text'}
            ]
        }
    }

    setActiveTask = (text: string, title: string) => {
        this.activeTask = {text, title}
    }

    setTasksForDelete = (taskId: string) => {
        if (this.tasksForDelete.includes(taskId)) {
            this.tasksForDelete = this.tasksForDelete.filter(item => item !== taskId)
        } else {
            this.tasksForDelete.push(taskId);
        }
    }

    resetTasksForDelete = () => {
        this.tasksForDelete = [];
    }

    //По идее функции deleteTasks и addTask надо куда-то вынести, потому что это утилитные функции и напрямую не меняют стор
    deleteTasks = (taskArr: Task[], idsForDelete: string[]) => {
        return taskArr.filter((task) => {
            if (idsForDelete.includes(task.id)) {
                return false;
            } else if (task.subtasks && task.subtasks.length) {
                task.subtasks = this.deleteTasks(task.subtasks, idsForDelete);
            }
            return true;
        });
    }

    addTask = (tasks: Task[], parentId: string, newSubTask: Task) => {
        if(parentId === '0') {
            tasks.push(newSubTask);
            return tasks;
        }

        const updatedTasks: Task[] = [];
        const addSubtask = (task: Task) => {
            if (task.id === parentId) {
                task.subtasks = task.subtasks ? [...task.subtasks, newSubTask] : [newSubTask];
            } else if (task.subtasks) {
                task.subtasks = task.subtasks.map(addSubtask);
            }
            return task;
        }

        tasks.forEach((task) => {
            updatedTasks.push(addSubtask(task));
        });

        return updatedTasks;
    }

    deleteSelectedTasks = () => {
        this.allTasks = this.deleteTasks(this.allTasks, this.tasksForDelete);
        this.setActiveTask('', '');
        this.resetTasksForDelete();
        localStorage.setItem('tasks', JSON.stringify(this.allTasks));
    }

    addNewTask = (parentId: string, subTask: Task) => {
        this.allTasks = this.addTask(this.allTasks, parentId, subTask);
        localStorage.setItem('tasks', JSON.stringify(this.allTasks))
    }

    setSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.searchValue = event.target.value;
    }

    constructor() {
        makeAutoObservable(this);
    }
}

export default new Store();