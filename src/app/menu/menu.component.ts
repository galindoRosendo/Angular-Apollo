import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [LoginService]
})
export class MenuComponent implements OnInit {

  
  private user : String = "Sesion"

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  handle(index: string): void {
    if(index == "2-1"){
      this.logOut();
    }
  }

  ngOnInit() {
  }

  logOut(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }


}
