import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from '../user';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//import { LoginService } from '../';
import { ElMessageService } from 'element-angular'
import { ElNotificationService } from 'element-angular'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [LoginService]
})
export class SignInComponent implements OnInit {

  model = new User();

  constructor(
    private loginService: LoginService,
    private router: Router,
    private message: ElMessageService,
    private cookieService: CookieService,
    private notify: ElNotificationService
  ) { }

  ngOnInit() {
    
  }


  OnSubmit(){
    this.notify.setOptions({duration: 4000});
    this.loginService.userAuthentication(this.model.user,this.model.pass)
      .subscribe(({ data }) => {
        console.log('got data', data);
        this.cookieService.set( 'token', data.tokenAuth.token );
        let dataToken = this.loginService.verifyUser(data.tokenAuth.token)
          .subscribe(({data})=>{
            console.log('Usuario',data);
            this.access(true);
          },(error) => {
            this.notify["error"](error);
            console.log('error',error);
            this.access(false);
          });
        },(error) => {
          this.cookieService.set( 'token', "");
          setTimeout(() => { this.notify["error"]('Ocurrio un error al mandar la cosulta'); }, 100);
          setTimeout(() => { this.notify["error"](error); }, 200);
          
          this.access(false);
        });
    //this.access(data);
  }

  access(data){
    if(data){
      this.router.navigate(['/home']);
    }else{
      //this.message.setOptions({ showClose: true, center: true })
      //this.message["error"]('Usuario o Password Incorrecto');
      this.notify["error"]('Usuario o Password Incorrecto');
    }
  }

}
