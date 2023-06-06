import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

import { NewTipoContribuyenteComponent } from './components/tipo-contribuyente/new-tipo-contribuyente/new-tipo-contribuyente.component';
import { NewTipoDocumentoComponent } from './components/tipo-documento/new-tipo-documento/new-tipo-documento.component';
import { NewEntidadComponent } from './components/entidad/new-entidad/new-entidad.component';
import { EditEntidadComponent } from './components/entidad/edit-entidad/edit-entidad.component';
import { EditTipoContribuyenteComponent } from './components/tipo-contribuyente/edit-tipo-contribuyente/edit-tipo-contribuyente.component';
import { EditTipoDocumentoComponent } from './components/tipo-documento/edit-tipo-documento/edit-tipo-documento.component';
import { HeaderComponent } from './components/header/header.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, FormBuilder, ReactiveFormsModule  } from '@angular/forms';
import { ListTipoDocumentoComponent } from './components/tipo-documento/list-tipo-documento/list-tipo-documento.component';
import { interceptorProvider } from './components/interceptors/prod-interceptor.service';
import { ListTipoContribuyenteComponent } from './components/tipo-contribuyente/list-tipo-contribuyente/list-tipo-contribuyente.component';
import { ListEntidadComponent } from './components/entidad/list-entidad/list-entidad.component';
import { DetailEntidadComponent } from './components/entidad/detail-entidad/detail-entidad.component';

@NgModule({
  declarations: [
    AppComponent,
    NewTipoContribuyenteComponent,
    NewTipoDocumentoComponent,
    NewEntidadComponent,
    EditEntidadComponent,
    EditTipoContribuyenteComponent,
    EditTipoDocumentoComponent,
    HeaderComponent,
    IndexComponent,
    LoginComponent,
    SignupComponent,
    ListTipoDocumentoComponent,
    ListTipoContribuyenteComponent,
    ListEntidadComponent,
    DetailEntidadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
