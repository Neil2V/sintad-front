export class TipoContribuyente {
    id?: number;
    nombre: string;
    estado: boolean

    constructor(nombre: string, descripcion: string, estado: boolean){
        this.nombre = nombre;
        this.estado = estado;
    }
}
