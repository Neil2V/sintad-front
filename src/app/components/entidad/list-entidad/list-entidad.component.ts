import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Entidad } from 'src/app/models/entidad';
import { EntidadService } from 'src/app/service/entidad.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-list-entidad',
  templateUrl: './list-entidad.component.html',
  styleUrls: ['./list-entidad.component.scss']
})
export class ListEntidadComponent  implements OnInit{
  entidades: Entidad[] = [];
  page! : number;
  roles: string[] | undefined;
  isAdmin = false;

  constructor(
    private entidadService: EntidadService,
    private toastrService: ToastrService,
    private router: Router,
    private tokenService: TokenService
  ){}

  ngOnInit(): void {
    this.loadEntidades();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if(rol === 'ROLE_ADMIN'){
        this.isAdmin = true;
      }
    })
  }

  loadEntidades(): void{
    this.entidadService.listEntidades().subscribe(
      data => {
        this.entidades = data;
      },
      err => {
        console.log(err);
      }
    )
  }
}
