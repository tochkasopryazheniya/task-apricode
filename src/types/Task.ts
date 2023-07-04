type Task = {
    id: string,
    text: string,
    title: string,
    subtasks?: Task[]
}

export default Task;