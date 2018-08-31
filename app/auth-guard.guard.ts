import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UserLoginService} from './services/user-login.service';

@Injectable()
export class AuthGuardGuard implements CanActivate {
  constructor(private user: UserLoginService,private router: Router){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    if (this.user.getUserLoggedIn()==false){
      this.router.navigate(['/login']);
      alert("הירשם או התחבר למערכת");
    }
    return this.user.getUserLoggedIn();
  }
}
