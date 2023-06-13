import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entidad } from '../models/entidad';
import { Observable } from 'rxjs';
import { NewEntidad } from '../models/new-entidad';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EntidadService {

  entidadUrl = environment.entidadUrl;

  constructor(private httpCliente : HttpClient) { }

  public listEntidades(): Observable<Entidad[]>{
    return this.httpCliente.get<Entidad[]>(this.entidadUrl+'/list');
  }

  public getEntidadById(id: number): Observable<Entidad>{
    return this.httpCliente.get<Entidad>(this.entidadUrl+`/detail/${id}`);  
  }

  public createEntidad(newEntidad: NewEntidad): Observable<any>{
    return this.httpCliente.post(this.entidadUrl+'/create',newEntidad, {responseType: 'text'});
  }

  public updateEntidad(id: number, newEntidad: NewEntidad): Observable<any>{
    return this.httpCliente.put(this.entidadUrl+`/update/${id}`, newEntidad, {responseType: 'text'});
  }
}
