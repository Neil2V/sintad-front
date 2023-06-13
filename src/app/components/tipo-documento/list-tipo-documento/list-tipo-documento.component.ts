import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TipoDocumento } from 'src/app/models/tipo-documento';
import { TipoDocumentoService } from 'src/app/service/tipo-documento.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-list-tipo-documento',
  templateUrl: './list-tipo-documento.component.html',
  styleUrls: ['./list-tipo-documento.component.scss']
})
export class ListTipoDocumentoComponent implements OnInit{

  tipoDocumentos: TipoDocumento[] = [];
  page! : number;
  isAdmin = false;

  constructor(
    private tipoDocumentoService: TipoDocumentoService,
    private toastrService: ToastrService,
    private router: Router,
    private tokenService: TokenService
  ){}

  ngOnInit(): void {
    this.loadTipoDocumentos();
    this.isAdmin = this.tokenService.isAdmin();
  }

  loadTipoDocumentos(): void{
    this.tipoDocumentoService.listTipoDocumentos().subscribe(
      data => {
        this.tipoDocumentos = data;
      },
      err => {
        console.log(err);
      }
    )
  }

}
