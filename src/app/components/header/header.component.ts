import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  isLogged = false;

  constructor(private tokenService: TokenService){

  }

  ngOnInit(): void {
      if(this.tokenService.getToken()){
          this.isLogged = true;
      }else{
        this.isLogged = false;
      }

  }

  onLogOut():void {
    this.tokenService.logout();
    window.location.reload();
  }

}
