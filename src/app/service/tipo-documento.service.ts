import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoDocumento } from '../models/tipo-documento';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  tipoDocumentoUrl = environment.tipoDocumentoUrl;

  constructor(
    private httpCliente : HttpClient
  ) { }

  public listTipoDocumentos(): Observable<TipoDocumento[]>{
    return this.httpCliente.get<TipoDocumento[]>(this.tipoDocumentoUrl+'/list');
  }

  public getTipoDocumentoById(id: number): Observable<TipoDocumento>{
    return this.httpCliente.get<TipoDocumento>(this.tipoDocumentoUrl+`/detail/${id}`);  
  }

  public createTipoDocumento(tipoDocumento: TipoDocumento): Observable<any>{
    return this.httpCliente.post(this.tipoDocumentoUrl+'/create',tipoDocumento, {responseType: 'text'});
  }

  public updateTipoDocumento(id: number, tipoDocumento: TipoDocumento): Observable<any>{
    return this.httpCliente.put(this.tipoDocumentoUrl+`/update/${id}`, tipoDocumento, {responseType: 'text'});
  }

}
