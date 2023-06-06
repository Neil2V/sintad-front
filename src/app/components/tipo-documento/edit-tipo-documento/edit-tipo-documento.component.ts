import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TipoDocumento } from 'src/app/models/tipo-documento';
import { TipoDocumentoService } from 'src/app/service/tipo-documento.service';

@Component({
  selector: 'app-edit-tipo-documento',
  templateUrl: './edit-tipo-documento.component.html',
  styleUrls: ['./edit-tipo-documento.component.scss']
})
export class EditTipoDocumentoComponent implements OnInit{

  public formTipoDocumento !: FormGroup;

  tipoDocumento: TipoDocumento | undefined;

  codigo: string | undefined;
  nombre: string | undefined;
  descripcion: string | undefined;


  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private tipoDocumentoService: TipoDocumentoService,
    private toastrService: ToastrService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.formTipoDocumentoo();
    const id = this.activatedRoute.snapshot.params['id'];
    this.tipoDocumentoService.getTipoDocumentoById(id).subscribe(
      (data: TipoDocumento) => {
        this.tipoDocumento = data;
        this.loadData();
      }
    );
  }
  

  formTipoDocumentoo(): void{
    this.formTipoDocumento = this.formBuilder.group({
      id: [, []],
      codigo: ['', [Validators.required]],
      nombre: ['', []],
      descripcion: ['', [Validators.required]],
      estado: [false, [Validators.required]]
    })
  }

  loadData(): void{
    this.formTipoDocumento.patchValue({
      codigo: this.tipoDocumento?.codigo,
      nombre: this.tipoDocumento?.nombre,
      descripcion: this.tipoDocumento?.descripcion,
      estado: this.tipoDocumento?.estado
    });
  }

  editTipoDocumento(): void{
    const id = this.activatedRoute.snapshot.params['id'];

    

    this.tipoDocumentoService.updateTipoDocumento(id, this.formTipoDocumento.value).subscribe(
      response => {
        this.toastrService.success(response, 'Ok!',{
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
        this.router.navigate(['/tipo-documento/list']);
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
