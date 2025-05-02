import axios from "axios";
import { ISprint } from "../types/iSprints";
import { ITarea } from "../types/iTareas";
import { URL_SPRINT } from "../utils/constantes";

// Obtener todos los sprints
export const getAllSprints = async () => {
  const response = await axios.get<ISprint[]>(URL_SPRINT);
  return response.data;
};

// Obtener un sprint por ID (usando _id)
export const getSprintById = async (sprintId: string) => {
  const response = await axios.get<ISprint>(`${URL_SPRINT}/${sprintId}`);
  return response.data;
};

// Crear un nuevo sprint
export const createSprint = async (nuevaSprint: ISprint) => {
  console.log(nuevaSprint, "sprint controller");
  const response = await axios.post<ISprint>(URL_SPRINT, nuevaSprint);
  return response.data;
};

// Editar un sprint existente
export const updateSprint = async (sprintActualizada: ISprint) => {
  if (!sprintActualizada._id) {
    throw new Error("No se proporcionó el _id del sprint para editar");
  }

  const response = await axios.put<ISprint>(
    `${URL_SPRINT}/${sprintActualizada._id}`,
    sprintActualizada
  );
  return response.data;
};

// Eliminar un sprint
export const deleteSprint = async (idSprint: string) => {
  const response = await axios.delete(`${URL_SPRINT}/${idSprint}`);
  return response.data;
};

// Obtener las tareas de un sprint
export const getSprintTasks = async (sprintId: string): Promise<ITarea[]> => {
  const sprint = await getSprintById(sprintId);
  return sprint.tareas || [];
};

// Actualizar una tarea dentro de un sprint
export const updateSprintTask = async (
  sprintId: string,
  tareaActualizada: ITarea
) => {
  const sprint = await getSprintById(sprintId);

  const updatedTasks = sprint.tareas.map((t) =>
    t._id === tareaActualizada._id ? tareaActualizada : t
  );

  const updatedSprint: ISprint = {
    ...sprint,
    tareas: updatedTasks,
  };

  return await updateSprint(updatedSprint);
};

// Eliminar una tarea de un sprint (sin moverla al backlog)
export const removeTaskFromSprint = async (
  sprintId: string,
  taskId: string
) => {
  try {
    const response = await axios.post(`${URL_SPRINT}/${sprintId}/remove-task/${taskId}`);
    return response.data;
  } catch (error) {
    console.error("Error al devolver la tarea al backlog:", error);
    throw error;
  }
};

// Cambiar el estado de una tarea en un sprint
export const changeTaskStatus = async (
  sprintId: string,
  taskId: string,
  newStatus: "pendiente" | "en_curso" | "terminado"
) => {
  const sprint = await getSprintById(sprintId);

  const updatedTasks = sprint.tareas.map((t) =>
    t._id === taskId ? { ...t, estado: newStatus } : t
  );

  const updatedSprint: ISprint = {
    ...sprint,
    tareas: updatedTasks,
  };

  return await updateSprint(updatedSprint);
};
