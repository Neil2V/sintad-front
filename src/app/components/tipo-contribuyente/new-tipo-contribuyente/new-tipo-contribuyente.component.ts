import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TipoContribuyenteService } from 'src/app/service/tipo-contribuyente.service';

@Component({
  selector: 'app-new-tipo-contribuyente',
  templateUrl: './new-tipo-contribuyente.component.html',
  styleUrls: ['./new-tipo-contribuyente.component.scss']
})
export class NewTipoContribuyenteComponent implements OnInit{
  public formTipoContribuyente !: FormGroup;

  codigo: string | undefined;
  nombre: string | undefined;
  descripcion: string | undefined;


  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private tipoContribuyenteService: TipoContribuyenteService,
    private toastrService: ToastrService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.formTipoContribuyentee();
  }

  formTipoContribuyentee(): void{
    this.formTipoContribuyente = this.formBuilder.group({
      id: [, []],
      nombre: ['', []],
      estado: [false, [Validators.required]]
    })
  }

  createTipoContribuyentee(): void {
    
    this.tipoContribuyenteService.createTipoContribuyente(this.formTipoContribuyente.value).subscribe(
      response => {
          this.toastrService.success(response, 'Ok!',{
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });
          this.router.navigate(['/tipo-contribuyente/list']);
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
