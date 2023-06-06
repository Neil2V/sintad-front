import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewUser } from '../models/new-user';
import { Observable } from 'rxjs';
import { LoginUser } from '../models/login-user';
import { JwtDto } from '../models/jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = 'http://localhost:8080/auth';

  constructor(
    private http : HttpClient
  ) { }

  public signin(loginUser: LoginUser): Observable<JwtDto>{
    return this.http.post<JwtDto>(this.authUrl+'/login', loginUser);
  }

  public signup(newUser: NewUser): Observable<any>{
    return this.http.post(this.authUrl+'/new', newUser, {responseType: 'text'});
  }
}
