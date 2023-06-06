import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoContribuyente } from '../models/tipo-contribuyente';

@Injectable({
  providedIn: 'root'
})
export class TipoContribuyenteService {

  tipoContribuyenteUrl = 'http://localhost:8080/sintad/tipo-contribuyente';

  constructor(
    private httpCliente : HttpClient
  ) { }

  public listTipoContribuyente(): Observable<TipoContribuyente[]>{
    return this.httpCliente.get<TipoContribuyente[]>(this.tipoContribuyenteUrl+'/list');
  }

  public getTipoContribuyenteById(id: number): Observable<TipoContribuyente>{
    return this.httpCliente.get<TipoContribuyente>(this.tipoContribuyenteUrl+`/detail/${id}`);  
  }

  public createTipoContribuyente(tipoContribuyente: TipoContribuyente): Observable<any>{
    return this.httpCliente.post(this.tipoContribuyenteUrl+'/create',tipoContribuyente, {responseType: 'text'});
  }

  public updateTipoContribuyente(id: number, tipoContribuyente: TipoContribuyente): Observable<any>{
    return this.httpCliente.put(this.tipoContribuyenteUrl+`/update/${id}`, tipoContribuyente, {responseType: 'text'});
  }

}
