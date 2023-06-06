export class NewEntidad {
    id?: number;
    nro_documento: string;
    razon_social: string;
    nombre_comercial: string;
    direccion: string;
    telefono: string;
    estado: boolean;
    id_tipo_contribuyente?: number;
    id_tipo_documento?: number

    constructor(nro_documento: string, razon_social: string, nombre_comercial: string, direccion: string, telefono: string, estado: boolean,
        id_tipo_contribuyente: number, id_tipo_documento: number){
        this.nro_documento = nro_documento;
        this.razon_social = razon_social;
        this.nombre_comercial = nombre_comercial;
        this.direccion = direccion;
        this.telefono = telefono;
        this.estado = estado;
        this.id_tipo_contribuyente = id_tipo_contribuyente;
        this.id_tipo_documento = id_tipo_documento
    }
}
