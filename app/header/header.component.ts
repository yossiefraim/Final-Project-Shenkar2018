import { Component, OnInit } from '@angular/core';
import {UserLoginService} from '../services/user-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public user:UserLoginService,private router:Router) { }
  ngOnInit() {
  }

  login(){
    if(this.user.getUserLoggedIn()){
      if(confirm(this.user.getUserName()+",מעוניין להתנתק?")) {
        this.user.setUserLoggedOff();
        this.user.setUserName("כניסה לחשבון");
        this.router.navigate(['/home']);
        }else{
        this.router.navigate(['/userHome']);
        }
    }else{
      this.router.navigate(['/login']);
    }
  }
}
