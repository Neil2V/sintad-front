import { TipoContribuyente } from "./tipo-contribuyente";
import { TipoDocumento } from "./tipo-documento";

export class Entidad {
    id?: number;
    nro_documento: string;
    razon_social: string;
    nombre_comercial: string;
    direccion: string;
    telefono: string;
    estado: boolean;
    tipoDocumento: TipoDocumento;
    tipoContribuyente: TipoContribuyente

    constructor(nro_documento: string, razon_social: string, nombre_comercial: string, direccion: string, telefono: string, estado: boolean,
        tipoDocumento: TipoDocumento, tipoContribuyente: TipoContribuyente){
        this.nro_documento = nro_documento;
        this.razon_social = razon_social;
        this.nombre_comercial = nombre_comercial;
        this.direccion = direccion;
        this.telefono = telefono;
        this.estado = estado;
        this.tipoDocumento = tipoDocumento;
        this.tipoContribuyente = tipoContribuyente;
    }
}
