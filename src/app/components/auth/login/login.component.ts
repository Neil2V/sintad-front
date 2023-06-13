import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUser } from 'src/app/models/login-user';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formLogin !: FormGroup;


  loginUser: LoginUser | undefined;
  username: string | undefined;
  password: string | undefined;
  msgError: string | undefined;
  

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.formLoginn();
 
  }

  formLoginn(): void{
    this.formLogin = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  onLogin(): void {
     this.authService.signin(this.formLogin.value).subscribe(
        (data) => {

          this.tokenService.setToken(data.token);
        
          this.router.navigate(['/']);
          this.toastr.success('Bienvenido ' , 'Ok!', {
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });
        },
        (err) => {
          
          this.toastr.error('Error', 'Fail!', {
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });
        }
      );
    
  }

 
}
