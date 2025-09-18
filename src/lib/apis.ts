import axios from "axios";
import { NoteType, TaskType } from "./type";

export async function extractTasks(note: string, callback: (tasks: TaskType[]) => void) {
    return axios
    .post("https://port-0-oneminutes-mf68say742c07b64.sel5.cloudtype.app/api/categorizing/text", {
    content: note,
    })
    .then(function (response) {
        callback(response.data.todos_by_person as TaskType[]);
    })
    .catch(function (error) {
    console.log(error);
    });
}

export async function getTasks(callback: (tasks: TaskType[]) => void) {
    return axios
    .get("https://port-0-oneminutes-mf68say742c07b64.sel5.cloudtype.app/api/todo")
    .then(function (response) {
        callback(response.data.todos as TaskType[]);
    })
    .catch(function (error) {
    console.log(error);
    });
}

export async function saveTasks(tasks: TaskType[], callback?: (tasks: TaskType[]) => void) {
    return axios
    .post("https://port-0-oneminutes-mf68say742c07b64.sel5.cloudtype.app/api/todo", { todos: tasks })
    .then(function (response) {
        callback?.(response.data.todos as TaskType[]);
    })
    .catch(function (error) {
    console.log(error);
    });
}

export async function updateTask(task: TaskType, callback?: (task: TaskType) => void) {
    return axios
    .put(`https://port-0-oneminutes-mf68say742c07b64.sel5.cloudtype.app/api/todos/${task.id}`, task)
    .then(function (response) {
        callback?.(response.data.todo as TaskType);
    })
    .catch(function (error) {
    console.log(error);
    });
}


export async function getNotes(callback: (notes: NoteType[]) => void) {
    return axios
    .get(`https://port-0-oneminutes-mf68say742c07b64.sel5.cloudtype.app/api/meeting`)
    .then(function (response) {
        callback?.(response.data.meeting as NoteType[]);
    })
    .catch(function (error) {
    console.log(error);
    });
}