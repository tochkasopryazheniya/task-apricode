import {makeAutoObservable} from "mobx";
import Task from "../types/Task";
import {v4} from "uuid";

type ActiveTask = {
    title: string,
    text: string
}

class Store {
    activeTask: ActiveTask = {title: '', text: ''};
    allTasks: Task[] = [
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
    ];
    tasksForDelete: string[] = [];


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

    deleteSelectedTasks = () => {
        this.allTasks = this.deleteTasks(this.allTasks, this.tasksForDelete);
        this.setActiveTask('', '');
        this.resetTasksForDelete();
    }

    constructor() {
        makeAutoObservable(this);
    }
}

export default new Store();