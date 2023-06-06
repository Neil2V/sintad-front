import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Entidad } from 'src/app/models/entidad';
import { EntidadService } from 'src/app/service/entidad.service';

@Component({
  selector: 'app-detail-entidad',
  templateUrl: './detail-entidad.component.html',
  styleUrls: ['./detail-entidad.component.scss']
})
export class DetailEntidadComponent implements OnInit{

  public formEntidad !: FormGroup;

  entidad: Entidad | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private entidadService: EntidadService,
    private toastrService: ToastrService,
    private router: Router
  ){}

  ngOnInit(): void {
   this.formEntidadd();
   this.getEntidad();
  }

  getEntidad(): void{
    const id = this.activatedRoute.snapshot.params['id'];
    this.entidadService.getEntidadById(id).subscribe(
      data => {
        this.entidad = data;
        
        this.loadData();
      },
      err => {
        this.toastrService.error(err.error.message, 'Fail!',{
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
      }
    )
  }

  formEntidadd(): void {
    this.formEntidad = this.formBuilder.group({
      id: [{ value: '', disabled: true }, []],
      nro_documento: [{ value: '', disabled: true }, []],
      razon_social: [{ value: '', disabled: true }, []],
      nombre_comercial: [{ value: '', disabled: true }, []],
      direccion: [{ value: '', disabled: true }, []],
      telefono: [{ value: '', disabled: true }, []],
      estado: [{ value: false, disabled: true }, [Validators.required]],
      nombreTipoDocumento: [{ value: '', disabled: true }, []],
      nombreTipoContribuyente: [{ value: '', disabled: true }, []],
    });
  }
  
    loadData(): void{
      this.formEntidad.patchValue({
        nro_documento: this.entidad?.nro_documento,
        razon_social: this.entidad?.razon_social,
        nombre_comercial: this.entidad?.nombre_comercial,
        direccion: this.entidad?.direccion,
        telefono: this.entidad?.telefono,
        estado: this.entidad?.estado,
        nombreTipoDocumento: this.entidad?.tipoDocumento.nombre,
        nombreTipoContribuyente: this.entidad?.tipoContribuyente.nombre
      });

  }



}
