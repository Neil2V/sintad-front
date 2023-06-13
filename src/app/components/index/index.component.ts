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
  nombreUsuario : string = '';
  rol: string = '';

  constructor(private tokenService: TokenService){

  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.nombreUsuario = this.tokenService.getUsername() ?? '';    
      this.rol = this.tokenService.isAdmin() ? 'admin' : 'user';
    } else {
      this.isLogged = false;
      this.nombreUsuario = '';
    }
  }
  

}
