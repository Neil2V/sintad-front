import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Entidad } from 'src/app/models/entidad';
import { NewEntidad } from 'src/app/models/new-entidad';
import { TipoContribuyente } from 'src/app/models/tipo-contribuyente';
import { TipoDocumento } from 'src/app/models/tipo-documento';
import { EntidadService } from 'src/app/service/entidad.service';
import { TipoContribuyenteService } from 'src/app/service/tipo-contribuyente.service';
import { TipoDocumentoService } from 'src/app/service/tipo-documento.service';

@Component({
  selector: 'app-edit-entidad',
  templateUrl: './edit-entidad.component.html',
  styleUrls: ['./edit-entidad.component.scss']
})
export class EditEntidadComponent implements OnInit{

  public formUpdateEntidad !: FormGroup;

  tipoContribuyentes: TipoContribuyente[] = [];
  tipoDocumentos: TipoDocumento[] = [];

  opcionesTipoDocumento: any[] = [];
  opcionesTipoContribuyente: any[] = [];

  updateEntidad: NewEntidad | undefined;
  entidad: Entidad | undefined;

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
    
    const id = this.activatedRoute.snapshot.params['id'];
    this.entidadService.getEntidadById(id).subscribe(
      data => {
        this.entidad = data;
        this.loadData();
      }
    );
  };
  

  formEntidadd(): void {
    this.formUpdateEntidad = this.formBuilder.group({
      id: [{ value: ''}, []],
      nro_documento: [{ value: ''}, []],
      razon_social: [{ value: ''}, []],
      nombre_comercial: [{ value: ''}, []],
      direccion: [{ value: ''}, []],
      telefono: [{ value: ''}, []],
      estado: [{ value: false}, [Validators.required]],
      id_tipo_documento: [{ value: ''}, []],
      id_tipo_contribuyente: [{ value: ''}, []],
    });
  }



  loadData(): void{
    this.formUpdateEntidad.patchValue({
      nro_documento: this.entidad?.nro_documento,
      razon_social: this.entidad?.razon_social,
      nombre_comercial: this.entidad?.nombre_comercial,
      direccion: this.entidad?.direccion,
      telefono: this.entidad?.telefono,
      estado: this.entidad?.estado,
      id_tipo_documento: this.entidad?.tipoDocumento.id,
      id_tipo_contribuyente: this.entidad?.tipoContribuyente.id
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


  editEntidad(): void{
    const id = this.activatedRoute.snapshot.params['id'];

    

    this.entidadService.updateEntidad(id, this.formUpdateEntidad.value).subscribe(
      response => {
        this.toastrService.success(response, 'Ok!',{
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
        this.router.navigate(['/entidad/list']);
      },
      err => {
        this.toastrService.error(err.error.message, 'Fail!',{
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      }
    )
  }

}
