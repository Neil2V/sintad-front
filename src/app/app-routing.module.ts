import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ListTipoDocumentoComponent } from './components/tipo-documento/list-tipo-documento/list-tipo-documento.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { NewTipoDocumentoComponent } from './components/tipo-documento/new-tipo-documento/new-tipo-documento.component';
import { EditTipoDocumentoComponent } from './components/tipo-documento/edit-tipo-documento/edit-tipo-documento.component';
import { TipoDocumentoGuardService as guardTipoDocumento} from './components/guards/tipo-documento-guard.service';
import { ListTipoContribuyenteComponent } from './components/tipo-contribuyente/list-tipo-contribuyente/list-tipo-contribuyente.component';
import { NewTipoContribuyenteComponent } from './components/tipo-contribuyente/new-tipo-contribuyente/new-tipo-contribuyente.component';
import { EditTipoContribuyenteComponent } from './components/tipo-contribuyente/edit-tipo-contribuyente/edit-tipo-contribuyente.component';
import { ListEntidadComponent } from './components/entidad/list-entidad/list-entidad.component';
import { NewEntidadComponent } from './components/entidad/new-entidad/new-entidad.component';
import { EditEntidadComponent } from './components/entidad/edit-entidad/edit-entidad.component';
import { DetailEntidadComponent } from './components/entidad/detail-entidad/detail-entidad.component';

import { LoginGuard as guardLogin} from './components/guards/login.guard';



const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'login', component: LoginComponent, canActivate: [guardLogin]},
  {path: 'signup', component: SignupComponent, canActivate: [guardLogin]},
  {path: 'tipo-documento/list', component: ListTipoDocumentoComponent, canActivate: [guardTipoDocumento], data: {expectedRol: ['admin', 'user']}},
  {path: 'tipo-documento/add', component: NewTipoDocumentoComponent, canActivate: [guardTipoDocumento], data: {expectedRol: ['admin']}},
  {path: 'tipo-documento/edit/:id', component: EditTipoDocumentoComponent, canActivate: [guardTipoDocumento], data: {expectedRol: ['admin']}},
  {path: 'tipo-contribuyente/list', component: ListTipoContribuyenteComponent, canActivate: [guardTipoDocumento], data: {expectedRol: ['admin', 'user']}},
  {path: 'tipo-contribuyente/add', component: NewTipoContribuyenteComponent, canActivate: [guardTipoDocumento], data: {expectedRol: ['admin']}},
  {path: 'tipo-contribuyente/edit/:id', component: EditTipoContribuyenteComponent, canActivate: [guardTipoDocumento], data: {expectedRol: ['admin']}},
  {path: 'entidad/list', component: ListEntidadComponent, canActivate: [guardTipoDocumento], data: {expectedRol: ['admin', 'user']}},
  {path: 'entidad/add', component: NewEntidadComponent, canActivate: [guardTipoDocumento], data: {expectedRol: ['admin']}},
  {path: 'entidad/detail/:id', component: DetailEntidadComponent, canActivate: [guardTipoDocumento], data: {expectedRol: ['admin', 'user']}},
  {path: 'entidad/edit/:id', component: EditEntidadComponent, canActivate: [guardTipoDocumento], data: {expectedRol: ['admin', 'user']}},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
