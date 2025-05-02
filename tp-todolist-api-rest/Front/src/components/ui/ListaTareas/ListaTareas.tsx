import React, { useState, useEffect } from 'react';
import styles from './ListaTareas.module.css';
import { backlogStore } from '../../../store/backlogStore';
import { ITarea } from '../../../types/iTareas';
import { Modal } from '../Modal/Modal';
import { useTareas } from '../../../hooks/useTareas';
import { sprintStore } from '../../../store/sprintStore';
import { getAllSprints } from '../../../data/sprintController';

const ListaTareas: React.FC = () => {
  const tareas = backlogStore((state) => state.tareas);
  console.log(tareas,"tareas ----------------------------------------------------------")
  const tareaActiva = backlogStore((state) => state.tareaActiva);
  const setTareaActiva = backlogStore((state) => state.setTareaActiva);
  const setArrayTareas = backlogStore((state) => state.setArrayTareas);
  const sprints = sprintStore((state) => state.sprints);
  const setArraySprints = sprintStore((state) => state.setArraySprints);
  const { eliminarTarea, asignarTareaASprint, getTareas } = useTareas();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modoVisualizacion, setModoVisualizacion] = useState(false);
  const [sprintSeleccionado, setSprintSeleccionado] = useState<Record<string, string>>({});

  useEffect(() => {
    getTareas();
  }, []);

  useEffect(() => {
    console.log("Tareas actuales en ListaTareas:", tareas);
  }, [tareas]);

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

  const handleEliminar = async (idTarea: string) => {
    if (!idTarea) return;
    const tarea = tareas.find(t => t._id === idTarea);
    if (!tarea) return;
    await eliminarTarea(idTarea);
    await getTareas();
  };

  const handleSprintChange = (tareaId: string, sprintId: string) => {
    setSprintSeleccionado({...sprintSeleccionado, [tareaId]: sprintId});
  };

  const handleAsignarSprint = async (tarea: ITarea) => {
    if (!tarea._id || !sprintSeleccionado[tarea._id]) return;

    const sprintId = sprintSeleccionado[tarea._id];
    try {
      await asignarTareaASprint(tarea._id, sprintId);
      const updatedSprints = await getAllSprints();
      setArraySprints(updatedSprints);
      const nuevosSprintsSeleccionados = { ...sprintSeleccionado };
      delete nuevosSprintsSeleccionados[tarea._id];
      setSprintSeleccionado(nuevosSprintsSeleccionados);
      await getTareas();
    } catch (error) {
      console.error("Error al asignar sprint:", error);
    }
  };

  const handleCloseModal = async () => {
    setIsModalOpen(false);
    await getTareas();
    setTimeout(() => {
      setTareaActiva(null);
      setModoVisualizacion(false);
    }, 100);
  };

  return (
    <div className={styles.taskTable}>
      <div className={styles.taskHeader}>
        <span>Título</span>
        <span>Descripción</span>
        <span>Sprint</span>
      </div>
      {tareas.length > 0 ? (
        tareas.map((tarea) => (
          <div key={tarea._id} className={styles.taskRow}>
            <span>{tarea.titulo}</span>
            <span>{tarea.descripcion}</span>
            <span>Sin asignar</span>

            <div className={styles.taskIcons}>
              <select 
                className={styles.sprintSelect}
                value={tarea._id ? sprintSeleccionado[tarea._id] || '' : ''}
                onChange={(e) => handleSprintChange(tarea._id!, e.target.value)}
              >
                <option value="">Seleccionar un sprint</option>
                {sprints.map(sprint => (
                  <option key={sprint._id} value={sprint._id}>
                    {sprint.nombre}
                  </option>
                ))}
              </select>
              <button
                onClick={() => handleAsignarSprint(tarea)}
                className={`${styles.sprintButton} ${sprintSeleccionado[tarea._id!] ? styles.sprintEnabled : styles.sprintDisabled}`}
                disabled={!sprintSeleccionado[tarea._id!]}
              >
                Enviar a Sprint
              </button>
              <button onClick={() => handleVerTarea(tarea)} className={styles.iconButton}>
                <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'white' }}>visibility</span>
              </button>
              <button onClick={() => handleEditar(tarea)} className={styles.iconButton}>
                <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'white' }}>edit</span>
              </button>
              <button onClick={() => handleEliminar(tarea._id!)} className={styles.iconButton}>
                <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'white' }}>delete</span>
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.emptyTasksMessage}>
          No hay tareas pendientes de asignar a un sprint
        </div>
      )}
      {isModalOpen && (
        <Modal 
          handleCloseModal={handleCloseModal}
          modoVisualizacion={modoVisualizacion}
        />
      )}
    </div>
  );
};

export default ListaTareas;
