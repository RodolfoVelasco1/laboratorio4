import React, { useState } from 'react';
import styles from './ListaTareasSprint.module.css';
import { backlogStore } from '../../../store/backlogStore';
import { ITarea } from '../../../types/iTareas';
import { Modal } from '../Modal/Modal';
import { sprintStore } from '../../../store/sprintStore';
import Swal from 'sweetalert2';
import { removeTaskFromSprint, updateSprintTask } from '../../../data/sprintController';
import { getAllBacklogTasks } from '../../../data/backlogController';

const ListaTareasSprint: React.FC = () => {
  const sprintActiva = sprintStore((state) => state.sprintActiva);
  const setTareaActiva = backlogStore((state) => state.setTareaActiva);
  const setArrayTareas = backlogStore((state) => state.setArrayTareas);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modoVisualizacion, setModoVisualizacion] = useState(false);

  const esFechaProxima = (fechaLimite: string): boolean => {
    if (!fechaLimite) return false;
    const fechaLimiteDate = new Date(fechaLimite);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const diferenciaDias = Math.ceil((fechaLimiteDate.getTime() - hoy.getTime()) / (1000 * 3600 * 24));
    return diferenciaDias >= 0 && diferenciaDias <= 3;
  };

  const getTareasFiltradas = (estado: 'pendiente' | 'en_curso' | 'terminado') => {
    return sprintActiva?.tareas?.filter(t => t.estado === estado) || [];
  };

  const moverTarea = async (tarea: ITarea, nuevoEstado: 'pendiente' | 'en_curso' | 'terminado') => {
    if (!sprintActiva?._id || !tarea._id) return;
    const tareaActualizada = { ...tarea, estado: nuevoEstado };
    try {
      await updateSprintTask(sprintActiva._id, tareaActualizada);
      const tareasActualizadas = sprintActiva.tareas.map(t => t._id === tarea._id ? tareaActualizada : t);
      sprintStore.getState().setSprintActiva({ ...sprintActiva, tareas: tareasActualizadas });
    } catch (error) {
      console.error("Error al mover tarea:", error);
    }
  };

  const enviarAlBacklog = async (tarea: ITarea) => {
    if (!sprintActiva?._id || !tarea._id) return;
    try {
      await removeTaskFromSprint(sprintActiva._id, tarea._id);
      const tareasActualizadas = sprintActiva.tareas.filter(t => t._id !== tarea._id);
      sprintStore.getState().setSprintActiva({ ...sprintActiva, tareas: tareasActualizadas });
      const backlogTasks = await getAllBacklogTasks();
      setArrayTareas(backlogTasks);
      Swal.fire("Completado", "La tarea se envió al backlog correctamente", "success");
    } catch (error) {
      console.error("Error al enviar tarea al backlog:", error);
    }
  };

  const handleVerTarea = (tarea: ITarea) => {
    setTareaActiva(tarea);
    setModoVisualizacion(true);
    setIsModalOpen(true);
  };

  const handleEditar = (tarea: ITarea) => {
    setTareaActiva(tarea);
    setModoVisualizacion(false);
    setIsModalOpen(true);
  };

  const handleEliminar = async (tarea: ITarea) => {
    if (!tarea._id || !sprintActiva?._id) return;
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });
    if (!confirm.isConfirmed) return;

    try {
      await removeTaskFromSprint(sprintActiva._id, tarea._id);
      const tareasActualizadas = sprintActiva.tareas.filter(t => t._id !== tarea._id);
      sprintStore.getState().setSprintActiva({ ...sprintActiva, tareas: tareasActualizadas });
      Swal.fire("Eliminado", "La tarea se eliminó correctamente", "success");
    } catch (error) {
      console.error("Error al eliminar tarea del sprint:", error);
      Swal.fire("Error", "No se pudo eliminar la tarea", "error");
    }
  };

  const renderTarea = (tarea: ITarea) => (
    <div key={tarea._id} className={`${styles.taskRow} ${esFechaProxima(tarea.fechaLimite) ? styles.taskUrgent : ''}`}>
      <span className={styles.taskTitle}>{tarea.titulo}</span>
      <div className={styles.taskIcons}>
        <button onClick={() => enviarAlBacklog(tarea)} className={styles.moveBacklog}>Enviar al Backlog</button>
        {tarea.estado === 'pendiente' && (
          <button onClick={() => moverTarea(tarea, 'en_curso')} className={styles.moveButton}>▶</button>
        )}
        {tarea.estado === 'en_curso' && (
          <>
            <button onClick={() => moverTarea(tarea, 'pendiente')} className={styles.moveButton}>◀</button>
            <button onClick={() => moverTarea(tarea, 'terminado')} className={styles.moveButton}>▶</button>
          </>
        )}
        {tarea.estado === 'terminado' && (
          <button onClick={() => moverTarea(tarea, 'en_curso')} className={styles.moveButton}>◀</button>
        )}
        <button onClick={() => handleVerTarea(tarea)} className={styles.iconButton}>👁</button>
        <button onClick={() => handleEditar(tarea)} className={styles.iconButton}>✏</button>
        <button onClick={() => handleEliminar(tarea)} className={styles.iconButton}>🗑</button>
      </div>
    </div>
  );

  return (
    <>
      {sprintActiva ? (
        <div className={styles.taskTable}>
          <div className={styles.columnContainer}>
            {['pendiente', 'en_curso', 'terminado'].map((estado) => (
              <div key={estado} className={styles.column}>
                <div className={styles.columnHeader}><h3>{estado.replace('_', ' ').toUpperCase()}</h3></div>
                <div className={styles.columnContent}>
                  {getTareasFiltradas(estado as any).map(tarea => renderTarea(tarea))}
                  {getTareasFiltradas(estado as any).length === 0 && (
                    <div className={styles.emptyMessage}>No hay tareas {estado.replace('_', ' ')}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.noSprintSelected}><p>Selecciona un sprint para ver las tareas</p></div>
      )}

      {isModalOpen && (
        <Modal
          handleCloseModal={() => {
            setIsModalOpen(false);
            setModoVisualizacion(false);
          }}
          modoVisualizacion={modoVisualizacion}
          isSprintTask={true}
        />
      )}
    </>
  );
};

export default ListaTareasSprint;
