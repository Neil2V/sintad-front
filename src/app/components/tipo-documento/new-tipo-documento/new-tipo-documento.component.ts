import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TipoDocumentoService } from 'src/app/service/tipo-documento.service';

@Component({
  selector: 'app-new-tipo-documento',
  templateUrl: './new-tipo-documento.component.html',
  styleUrls: ['./new-tipo-documento.component.scss']
})
export class NewTipoDocumentoComponent implements OnInit{

  public formTipoDocumento !: FormGroup;

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

  createTipoDocumento(): void {
    
    this.tipoDocumentoService.createTipoDocumento(this.formTipoDocumento.value).subscribe(
      response => {
          this.toastrService.success(response, 'Ok!',{
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });
          this.router.navigate(['/tipo-documento/list']);
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
