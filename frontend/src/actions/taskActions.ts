import axios from "axios";
import {Task} from "../types/Task";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function getAllTasks(id: string | null): Promise<Task[]> {
    let endpoint = `${API_URL}/task`;
    if (id) {
        endpoint += `/user/${id}`;
    }
    try {
        const response = await axios.get(endpoint, {withCredentials: true});
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
}

export async function getTasksByUserId(): Promise<Task> {
    try {
        const response = await axios.get(`${API_URL}/task/user/681a1c019747637c53ec3c85`, {withCredentials: true});
        console.warn("############### this is the data tasks by user id")
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching task with id ${id}:`, error);
        throw error;
    }
}

export async function createTask(taskData: Omit<Task, '_id'>): Promise<Task> {
    try {
        const response = await axios.post(`${API_URL}/task`, taskData, {withCredentials: true});
        return response.data;
    } catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
}

export async function updateTask(task: Task): Promise<Task> {
    try {
        const {_id, ...taskData} = task;
        const response = await axios.put(`${API_URL}/task/${_id}`, taskData, {withCredentials: true});
        return response.data;
    } catch (error) {
        console.error(`Error updating task with id ${task._id}:`, error);
        throw error;
    }
}

export async function updateTaskStatus(id: string, taskStatus: "enCours" | "termine"): Promise<Task> {
    try {
        const response = await axios.patch(`${API_URL}/task/${id}/status`, {taskStatus}, {withCredentials: true});
        return response.data;
    } catch (error) {
        console.error(`Error updating task status with id ${id}:`, error);
        throw error;
    }
}

export async function deleteTask(id: string): Promise<void> {
    try {
        await axios.delete(`${API_URL}/task/${id}`, {withCredentials: true});
    } catch (error) {
        console.error(`Error deleting task with id ${id}:`, error);
        throw error;
    }
}
