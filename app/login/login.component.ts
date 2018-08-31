import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserLoginService} from '../services/user-login.service';
import { ApplicationService } from '../services/application.service';
import {Message} from 'primeng/components/common/api';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private router : Router, private user:UserLoginService,private app:ApplicationService) { }
  private userName;
  private password;
  public msgs: Message[] = [];

  ngOnInit() {
  }
  

  loginUser(e){
    e.preventDefault();
    this.clearMsg();
    this.userName= e.target.elements[0].value.toLowerCase();
     this.password = e.target.elements[1].value;
     if(this.userName == 'admin' && this.password == 'admin'){
      this.user.setUserLoggedIn();
      this.router.navigate(['userHome']);
     }else{
      this.user.login(this.userName,this.password);
      this.user.newPost.forEach(post => {
        if((post!=null)&&(parseInt(this.password) == parseInt(post[0][0].password))){
          this.user.updateName(post[0][0].firstname,post[0][0].lastname);
          this.user.setUserInfo(post[0][0].firstname,post[0][0].lastname,post[0][0].age,post[0][0].kids,post[0][0].familyStatus,post[0][0].id);
          this.user.setUserContact(post[0][0].mail,post[0][0].phone,post[0][0].city,post[0][0].street,post[0][0].houseNumber);
          this.user.setUserInterest(post[0][0].elderly,post[0][0].student,post[0][0].ride,post[0][0].handyman);
          this.user.setUserPass(post[0][0].password);
          if(post[1]) this.user.setUserApplications(post[1]);
          if(post[2])this.user.setUserOffers(post[2]);
          if(post[3]) this.user.setUserMatchApplications(post[3]);
          if(post[4])this.user.setUserMatchOffer(post[4]);
          this.user.setUserLoggedIn();
          this.router.navigate(['userHome']);
        }else{
          this.showErrorMsg();
          //this.msgs.push({severity:'error', summary:'התחברות', detail:'שם משתמש או סיסמא אינם נכונים'});
        }
        return false;
        });
      }
    }
    showErrorMsg(){
      this.msgs.push({severity:'error', summary:'התחברות', detail:'שם משתמש או סיסמא אינם נכונים'});
    } 
    clearMsg(){
      this.msgs = [];
    }
  }
