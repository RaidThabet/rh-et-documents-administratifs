import axios from "axios";
import {Task} from "../types/Task";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function getAllTasks(): Promise<Task[]> {
    try {
        const response = await axios.get(`${API_URL}/task`, {withCredentials: true});
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
}

export async function getTaskById(id: string): Promise<Task> {
    try {
        const response = await axios.get(`${API_URL}/task/${id}`, {withCredentials: true});
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
