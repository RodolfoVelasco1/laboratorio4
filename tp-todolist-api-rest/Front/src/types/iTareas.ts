export interface ITarea {
    _id?: string
    titulo: string
    descripcion: string
    fechaLimite: string
    estado: 'pendiente' | 'en_curso' | 'terminado'
}