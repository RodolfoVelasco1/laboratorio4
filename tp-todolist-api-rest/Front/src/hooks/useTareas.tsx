import { useShallow } from "zustand/shallow";
import { backlogStore } from "../store/backlogStore";
import { ITarea } from "../types/iTareas";
import Swal from "sweetalert2";
import {
  getAllBacklogTasks,
  addTaskToBacklog,
  updateBacklogTask,
  deleteBacklogTask,
  moveTaskToSprint
} from "../data/backlogController";

export const useTareas = () => {
  const {
    tareas,
    setArrayTareas,
    agregarNuevaTarea,
    eliminarUnaTarea,
    editarUnaTarea
  } = backlogStore(useShallow((state) => ({
    tareas: state.tareas,
    setArrayTareas: state.setArrayTareas,
    agregarNuevaTarea: state.agregarNuevaTarea,
    eliminarUnaTarea: state.eliminarUnaTarea,
    editarUnaTarea: state.editarUnaTarea
  })));

  const getTareas = async () => {
    try {
      const data = await getAllBacklogTasks();
      if (data && Array.isArray(data)) {
        setArrayTareas(data); // ya tienen _id
      }
    } catch (error) {
      console.error("Error obteniendo tareas:", error);
      Swal.fire("Error", "No se pudieron cargar las tareas", "error");
    }
  };

  const createTarea = async (nuevaTarea: ITarea, sprintId?: string) => {
    try {
      const tareaGuardada = await addTaskToBacklog(nuevaTarea); // esto devuelve el objeto con _id real
      if (!tareaGuardada || !tareaGuardada._id) throw new Error("Tarea no guardada correctamente");
  
      if (sprintId) {
        await moveTaskToSprint(tareaGuardada._id, sprintId);
        Swal.fire("Éxito", "Tarea creada y asignada al sprint correctamente", "success");
      } else {
        agregarNuevaTarea(tareaGuardada); // agregar solo si no está en sprint
        Swal.fire("Éxito", "Tarea creada correctamente", "success");
      }
    } catch (error) {
      console.error("Error al crear la tarea:", error);
      Swal.fire("Error", "No se pudo crear la tarea", "error");
    }
  };
  

  const putTareaEditar = async (tareaActualizada: ITarea, mostrarAlerta: boolean = true) => {
    try {
      await updateBacklogTask(tareaActualizada);
      editarUnaTarea(tareaActualizada);

      if (mostrarAlerta) {
        Swal.fire("Éxito", "Tarea actualizada correctamente", "success");
      }

      return tareaActualizada;
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
      Swal.fire("Error", "No se pudo actualizar la tarea", "error");
      throw error;
    }
  };

  const asignarTareaASprint = async (idTarea: string, sprintId: string) => {
    try {
      const tarea = tareas.find(t => t._id === idTarea);
      if (!tarea) throw new Error("Tarea no encontrada");

      await moveTaskToSprint(idTarea, sprintId);
      eliminarUnaTarea(idTarea);
      Swal.fire("Éxito", "Tarea asignada al sprint correctamente", "success");
    } catch (error) {
      console.error("Error al asignar tarea al sprint:", error);
      Swal.fire("Error", "No se pudo asignar la tarea al sprint", "error");
    }
  };

  const eliminarTarea = async (idTarea: string) => {
    const estadoPrevio = tareas.find((el) => el._id === idTarea);

    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });

    if (!confirm.isConfirmed) return;

    eliminarUnaTarea(idTarea);
    try {
      await deleteBacklogTask(idTarea);
      Swal.fire("Eliminado", "La tarea se eliminó correctamente", "success");
    } catch (error) {
      if (estadoPrevio) agregarNuevaTarea(estadoPrevio);
      console.error("Error al eliminar la tarea:", error);
      Swal.fire("Error", "No se pudo eliminar la tarea", "error");
    }
  };

  return {
    getTareas,
    createTarea,
    putTareaEditar,
    asignarTareaASprint,
    eliminarTarea,
    tareas
  };
};
