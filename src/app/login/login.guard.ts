import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router, ActivatedRouteSnapshot } from '@angular/router'
import { Observable, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
 })
 export class LoginGuard implements CanLoad {
  constructor(
  private loginService: LoginService,
  private router: Router
  ){}
  canLoad(
  route: Route,
  segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  return this.loginService.usuarioLoggeado.pipe(
  take(1),
  switchMap(isAuth => {
  if(!isAuth){
  return this.loginService.autoLogin();
  }
  else{
  return of(isAuth);
  }
  }),
  tap(isAuth => {
  console.log(this.loginService.usuarioLoggeado);
  if(!this.loginService.usuarioLoggeado){
  this.router.navigateByUrl('/login');
  }
  })
  );
  }
 }
