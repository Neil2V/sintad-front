import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewEntidad } from 'src/app/models/new-entidad';
import { TipoContribuyente } from 'src/app/models/tipo-contribuyente';
import { TipoDocumento } from 'src/app/models/tipo-documento';
import { EntidadService } from 'src/app/service/entidad.service';
import { TipoContribuyenteService } from 'src/app/service/tipo-contribuyente.service';
import { TipoDocumentoService } from 'src/app/service/tipo-documento.service';

@Component({
  selector: 'app-new-entidad',
  templateUrl: './new-entidad.component.html',
  styleUrls: ['./new-entidad.component.scss']
})
export class NewEntidadComponent implements OnInit{
  public formNewEntidad !: FormGroup;
  tipoContribuyentes: TipoContribuyente[] = [];
  tipoDocumentos: TipoDocumento[] = [];

  codigo: string | undefined;
  nombre: string | undefined;
  descripcion: string | undefined;

  opcionesTipoDocumento: any[] = [];
  opcionesTipoContribuyente: any[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private entidadService: EntidadService,
    private toastrService: ToastrService,
    private router: Router,
    private tipoContribuyenteService: TipoContribuyenteService,
    private tipoDocumentoService: TipoDocumentoService,
  ){}

  ngOnInit(): void {
    this.loadTipoContribuyente();
    this.loadTipoDocumentos();
    this.formEntidadd();
    
  }

  formEntidadd(): void {
    this.formNewEntidad = this.formBuilder.group({
      id: [, []],
      nro_documento: ['', [Validators.required]],
      razon_social: ['', [Validators.required]],
      nombre_comercial: ['', []],
      direccion: ['', []],
      telefono: ['', []],
      estado: [false, [Validators.required]],
      id_tipo_documento: [1, [Validators.required]],
      id_tipo_contribuyente: [1,[]],
    });
  }
  

  loadTipoContribuyente(): void {
    this.tipoContribuyenteService.listTipoContribuyente().subscribe(
      data => {
        this.tipoContribuyentes = data;
        this.opcionesTipoContribuyente = data.map(opcion => {
          return { id: Number(opcion.id), nombre: opcion.nombre };
        });
 
      },
      err => {
        console.log(err);
      }
    );
  }
  

  loadTipoDocumentos(): void{
    this.tipoDocumentoService.listTipoDocumentos().subscribe(
      data => {
        this.tipoDocumentos = data;
        this.opcionesTipoDocumento = data;
       
      },
      err => {
        console.log(err);
      }
    )
  }

  createEntidad(): void {
   

    this.entidadService.createEntidad(this.formNewEntidad.value).subscribe(
      response => {
          this.toastrService.success(response, 'Ok!',{
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });
          this.router.navigate(['/entidad/list']);
        },
        err => {
          console.log("error: ",err);
          this.toastrService.error(err.error.message, 'Fail!',{
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });
          this.router.navigate(['/']);
        }
    );
  }

}
