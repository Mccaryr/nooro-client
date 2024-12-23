import axios from "axios";
import {TaskType} from "@/app/types";


export const fetchTasks = async (): Promise<TaskType[] | unknown> => {
    try {
        const response = await axios.get('http://localhost:3001/tasks');
        return response.data;
    } catch(error) {
        return error
    }
}

export const createTask = async (task: TaskType): Promise<TaskType | unknown> => {
    try {
        const response = await axios.post('http://localhost:3001/tasks', task);
        return response.data;
    } catch(error) {
        return error
    }
}

export const updateTask = async (task: TaskType): Promise<void | unknown> => {
    try {
        console.log("task: ", task)
        const response = await axios.put(`http://localhost:3001/tasks/${task.id}`, task);
        return response.data;
    } catch (error) {
        return error
    }
}

export const deleteTask = async (id: string): Promise<void | unknown> => {
    try {
        const response = await axios.delete(`http://localhost:3001/tasks/${id}`);
        return response.data
    } catch (error) {
        return error
    }
}