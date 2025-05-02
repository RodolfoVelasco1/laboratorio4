import { ITarea } from "./iTareas"

export interface ISprint {
    _id?:string
    nombre: string
    fechaInicio: string
    fechaCierre: string
    tareas: ITarea[]
}