import axios from "axios";
import { ITarea } from "../types/iTareas";
import { URL_BACKLOG, URL_SPRINT } from "../utils/constantes";

// GET todas las tareas pendientes
export const getAllBacklogTasks = async () => {
  const response = await axios.get<{ tareas: ITarea[] }>(URL_BACKLOG);
  return response.data.tareas;
};

// POST nueva tarea pendiente
export const addTaskToBacklog = async (tarea: ITarea) => {
  const response = await axios.post<ITarea>(URL_BACKLOG, tarea);
  return response.data;
};

// PUT actualizar tarea por _id
export const updateBacklogTask = async (tarea: ITarea) => {
  if (!tarea._id) throw new Error("_id requerido para actualizar tarea");
  const response = await axios.put<ITarea>(`${URL_BACKLOG}/${tarea._id}`, tarea);
  return response.data;
};

// DELETE eliminar tarea por _id
export const deleteBacklogTask = async (id: string) => {
  console.log(id,"tarea id")
  const response = await axios.delete(`${URL_BACKLOG}/${id}`);
  return response.data;
};

// POST mover tarea a sprint (usa _id también)
export const moveTaskToSprint = async (taskId: string, sprintId: string) => {
  const response = await axios.post(`${URL_SPRINT}/${sprintId}/add-task/${taskId}`);
  return response.data;
};
