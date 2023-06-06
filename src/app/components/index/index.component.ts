import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit{

  roles: Array<string> = [];
  isLogged = false;
  nombreUsuario = '';
  rol = '';

  constructor(private tokenService: TokenService){

  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.nombreUsuario = this.tokenService.getUsername() ?? '';
      this.roles = this.tokenService.getAuthorities();
      this.rol = 'Usuario';
      if (this.roles.includes('ROLE_ADMIN')) {
        this.rol = 'Admin'
      } 
    } else {
      this.isLogged = false;
      this.nombreUsuario = '';
    }
  }
  

}
