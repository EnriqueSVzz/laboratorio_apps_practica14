import { LoginService } from './login/login.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
 selector: 'app-root',
 templateUrl: 'app.component.html',
 styleUrls: ['app.component.scss'],
})


export class AppComponent implements OnInit, OnDestroy {


 private loginSub: Subscription;
 private lastState = false;
 constructor(
 private loginService: LoginService,
 private router: Router
 ) {}


 ngOnInit()
 {
 this.loginSub = this.loginService.usuarioLoggeado.subscribe(isAuth => {
 if(!isAuth && this.lastState !== isAuth){
 this.router.navigateByUrl('/login');
 }
 this.lastState = isAuth;
 });
 }


 ngOnDestroy()
 {
  if(this.loginSub){
  this.loginSub.unsubscribe();
  }
 }
 onLogout()
 {
  this.loginService.logout();
  this.router.navigateByUrl('/login');
 }
}

