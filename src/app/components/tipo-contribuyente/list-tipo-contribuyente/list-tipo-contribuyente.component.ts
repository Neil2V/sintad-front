import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TipoContribuyente } from 'src/app/models/tipo-contribuyente';
import { TipoContribuyenteService } from 'src/app/service/tipo-contribuyente.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-list-tipo-contribuyente',
  templateUrl: './list-tipo-contribuyente.component.html',
  styleUrls: ['./list-tipo-contribuyente.component.scss']
})
export class ListTipoContribuyenteComponent implements OnInit{
  tipoContribuyentes: TipoContribuyente[] = [];
  page! : number;
  roles: string[] | undefined;
  isAdmin = false;

  constructor(
    private tipoContribuyenteService: TipoContribuyenteService,
    private toastrService: ToastrService,
    private router: Router,
    private tokenService: TokenService
  ){}

  ngOnInit(): void {
    this.loadTipoContribuyente();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if(rol === 'ROLE_ADMIN'){
        this.isAdmin = true;
      }
    })
  }

  loadTipoContribuyente(): void{
    this.tipoContribuyenteService.listTipoContribuyente().subscribe(
      data => {
        this.tipoContribuyentes = data;
      },
      err => {
        console.log(err);
      }
    )
  }
}
