import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewUser } from 'src/app/models/new-user';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public formSignup !: FormGroup;

  isLogged = false;
  name: string | undefined;
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
  newUser: NewUser | undefined;
  error: string | undefined;


  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formSignupp();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  formSignupp(): void{
    this.formSignup = this.formBuilder.group({
      id: [, []],
      name: ['', [Validators.required]],
      username: ['', []],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  onRegister(): void {
      this.authService.signup(this.formSignup.value).subscribe(
        response => {
          this.toastr.success(response + ', Bienvenido ' + this.formSignup.value.username, 'Ok!', {
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });

          this.router.navigate(['/login']);
        },
        err => {
          this.error = err.error.message;
          this.toastr.error(this.error, 'Ok!', {
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });
        }
      );
    
  }

}
