import React, { useEffect, useState } from 'react';
import styles from './SprintList.module.css';
import { ModalSprint } from '../Modal/ModalSprint';
import { ISprint } from '../../../types/iSprints';
import { useSprints } from '../../../hooks/useSprints';
import { sprintStore } from '../../../store/sprintStore';
import { useNavigate } from 'react-router-dom';

const SprintList: React.FC = () => {
  const [isModalSprintOpen, setIsModalSprintOpen] = useState(false);
  const sprints = sprintStore((state) => state.sprints);
  const setSprintActiva = sprintStore((state) => state.setSprintActiva);
  const { eliminarSprint, getSprints } = useSprints();
  const navigate = useNavigate();

  const openModalSprint = () => {
    setSprintActiva(null);
    setIsModalSprintOpen(true);
  };

  const closeModalSprint = () => {
    setIsModalSprintOpen(false);
    getSprints();
  };

  const handleGoToSprint = (sprint: ISprint) => {
    setSprintActiva(sprint);
    navigate(`/sprint/${sprint._id}`);
  };

  useEffect(() => {
    getSprints();
  }, []);

  useEffect(() => {
    console.log("Sprints actuales en ListaSprints:", sprints);
  }, [sprints]);

  const handleEditar = (sprint: ISprint) => {
    setSprintActiva(sprint);
    setIsModalSprintOpen(true);
  };

  const handleEliminar = (idSprint: string) => {
    if (!idSprint) {
      console.error("ID de sprint inválido");
      return;
    }
    eliminarSprint(idSprint);
  };

  return (
    <div className={styles.sprintListContainer}>
      <div className={styles.sprintItem}>
        <span>Backlog</span>
      </div>
      <div className={styles.sprintItem}>
        Lista sprint
        <button className={styles.createTaskButton} onClick={openModalSprint}>
          Crear Sprint
        </button>
      </div>

      <div className={styles.sprintDetailsBox}>
        {sprints.map((sprint) => (
          <div
            key={sprint._id}
            className={styles.sprintDetailsRow}
          >
            <div className={styles.sprintDetailsRox}>
              <span>Título: </span>
              <span>{sprint.nombre || 'Sin nombre'}</span>
            </div>
            <div className={styles.sprintDetailsRox}>
              <span>Inicio: </span>
              <span>{sprint.fechaInicio?.slice(0, 10)}</span>
            </div>
            <div className={styles.sprintDetailsRox}>
              <span>Cierre: </span>
              <span>{sprint.fechaCierre?.slice(0, 10)}</span>
            </div>

            <div className={styles.sprintActionIcons}>
              <button onClick={() => handleGoToSprint(sprint)} className={styles.iconButton}>
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: '24px',
                    color: 'white',
                    transition: 'color 0.1s ease-in-out',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#5076f1')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'white')}
                >
                  visibility
                </span>
              </button>

              <button onClick={() => handleEditar(sprint)} className={styles.iconButton}>
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: '24px',
                    color: 'white',
                    transition: 'color 0.1s ease-in-out',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#5076f1')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'white')}
                >
                  edit
                </span>
              </button>

              <button
                onClick={() => {
                  const id = sprint._id;
                  if (id) {
                    handleEliminar(id);
                  } else {
                    console.error("Sprint sin ID:", sprint);
                  }
                }}
                className={styles.iconButton}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: '24px',
                    color: 'white',
                    transition: 'color 0.1s ease-in-out',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#5076f1')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'white')}
                >
                  delete
                </span>
              </button>
            </div>
          </div>
        ))}

        {sprints.length === 0 && (
          <div className={styles.emptySprintsMessage}>No hay sprints creados</div>
        )}
      </div>

      {isModalSprintOpen && (
        <ModalSprint handleCloseModalSprint={closeModalSprint} />
      )}
    </div>
  );
};

export default SprintList;
