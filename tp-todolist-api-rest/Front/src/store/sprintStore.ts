import { create } from "zustand";
import { ISprint } from "../types/iSprints";

interface ISprintStore {
  sprints: ISprint[];
  sprintActiva: ISprint | null;
  setSprintActiva: (sprint: ISprint | null) => void;
  setArraySprints: (sprints: ISprint[]) => void;
  agregarNuevaSprint: (sprint: ISprint) => void;
  editarUnaSprint: (sprint: ISprint) => void;
  eliminarUnaSprint: (id: string) => void;
  agregarTareaAlSprint: (sprintId: string, nuevaTarea: any) => void;
}

export const sprintStore = create<ISprintStore>((set) => ({
  sprints: [],
  sprintActiva: null,

  setArraySprints: (sprints) => set(() => ({ sprints })),

  agregarNuevaSprint: (sprint) =>
    set((state) => ({
      sprints: [...state.sprints, sprint],
    })),

  editarUnaSprint: (sprintEditada) =>
    set((state) => ({
      sprints: state.sprints.map((s) =>
        s._id === sprintEditada._id ? { ...s, ...sprintEditada } : s
      ),
    })),

  eliminarUnaSprint: (id) =>
    set((state) => ({
      sprints: state.sprints.filter((s) => s._id !== id),
    })),

  agregarTareaAlSprint: (sprintId, nuevaTarea) =>
    set((state) => {
      const nuevosSprints = state.sprints.map((sprint) =>
        sprint._id === sprintId
          ? {
              ...sprint,
              tareas: [...(sprint.tareas || []), nuevaTarea],
            }
          : sprint
      );

      let nuevaSprintActiva = state.sprintActiva;
      if (state.sprintActiva?._id === sprintId) {
        nuevaSprintActiva = {
          ...state.sprintActiva,
          tareas: [...(state.sprintActiva.tareas || []), nuevaTarea],
        };
      }

      return {
        sprints: nuevosSprints,
        sprintActiva: nuevaSprintActiva,
      };
    }),

  setSprintActiva: (sprint) => set(() => ({ sprintActiva: sprint })),
}));
