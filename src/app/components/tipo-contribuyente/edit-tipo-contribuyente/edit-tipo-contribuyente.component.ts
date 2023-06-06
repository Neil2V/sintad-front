import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TipoContribuyente } from 'src/app/models/tipo-contribuyente';
import { TipoContribuyenteService } from 'src/app/service/tipo-contribuyente.service';

@Component({
  selector: 'app-edit-tipo-contribuyente',
  templateUrl: './edit-tipo-contribuyente.component.html',
  styleUrls: ['./edit-tipo-contribuyente.component.scss']
})
export class EditTipoContribuyenteComponent implements OnInit{
  public formTipoContribuyente !: FormGroup;

  tipoContribuyente: TipoContribuyente | undefined;

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
    const id = this.activatedRoute.snapshot.params['id'];
    this.tipoContribuyenteService.getTipoContribuyenteById(id).subscribe(
      (data: TipoContribuyente) => {
        this.tipoContribuyente = data;
        this.loadData();
      }
    );
  }
  

  formTipoContribuyentee(): void{
    this.formTipoContribuyente = this.formBuilder.group({
      id: [, []], 
      nombre: ['', []],   
      estado: [false, [Validators.required]]
    })
  }

  loadData(): void{
    this.formTipoContribuyente.patchValue({
       nombre: this.tipoContribuyente?.nombre,
       estado: this.tipoContribuyente?.estado
    });
  }

  editTipoContribuyente(): void{
    const id = this.activatedRoute.snapshot.params['id'];

    this.tipoContribuyenteService.updateTipoContribuyente(id, this.formTipoContribuyente.value).subscribe(
      response => {
        this.toastrService.success(response, 'Ok!',{
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
        this.router.navigate(['/tipo-contribuyente/list']);
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
