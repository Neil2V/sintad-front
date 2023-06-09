import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/service/token.service';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoGuardService implements CanActivate{

  realRol: string | undefined;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol = route.data['expectedRol'];

    this.realRol = this.tokenService.isAdmin() ? 'admin' : 'user';


    if(!this.tokenService.getToken() || expectedRol.indexOf(this.realRol)===-1){
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
