// TODO axios or fetch
import axios from "axios";
import { UnclassifiedTask } from "./type";

export function extractTasks(note: string, callback: (tasks: UnclassifiedTask[]) => void) {
    
    return axios
    .post("http://localhost:8080/api/categorizing/text", {
    content: note,
    })
    .then(function (response) {
        callback(response.data.todos_by_person as UnclassifiedTask[]);
    })
    .catch(function (error) {
    console.log(error);
    });
}