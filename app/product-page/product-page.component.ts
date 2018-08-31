import { Component, OnInit,NgZone } from '@angular/core';
import { OfferService } from '../services/offer.service';
import { UserLoginService } from '../services/user-login.service';
import { MatchServiceService } from '../services/match-service.service';
import { ApplicationService } from '../services/application.service';
import { Router } from '@angular/router';
import {Message} from 'primeng/components/common/api';




@Component({
  selector: 'productPage',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  constructor(private off:OfferService,private app:ApplicationService, private user:UserLoginService,private match:MatchServiceService, private router:Router,private ngZone: NgZone) { 
  
  }
  
  public item;
  public matchUser=null;
  public isDataLoaded:boolean=false;
  public msgs: Message[] = [];

  
  
  ngOnInit() {
     this.item=this.match.getLastItem();
    this.matchUser=this.user.getItemUser();
  }

  setManualMatch(){
    if(this.user.getUserLoggedIn()){
      if(this.item.applicationID!=null){
        this.match.createApplicationManualMatch(this.item.category,this.user.getUserId(),this.item.applicationID);
        this.addManualApplication(this.item);
        this.router.navigate(['/userHome']);
      }else{
       this.match.createOfferManualMatch(this.item.category,this.user.getUserId(),this.item.offerID);
       this.addManualOffer(this.item);
       this.router.navigate(['/userHome']);
      }
    }else{
      this.showErrorMsg();
      setTimeout(() => this.router.navigate(['/registration']), 3000);
      //this.router.navigate(['/registration']);
    }
  }

  addManualApplication(app){
    app.status="ממתין לאישור מבקש העזרה";
    if(confirm(this.user.getUserName()+",נוסף לאזור האישי!")) {
      this.match.setMatchApplication(app);
      }
  }
  addManualOffer(off){
    off.status="ממתין לאישור מציע העזרה";
    if(confirm(this.user.getUserName()+",נוסף לאזור האישי!")) {
      this.match.setMatchOffer(off);
      }
  }
  showErrorMsg(){
    this.msgs.push({severity:'warn', summary:'התחברות', detail:'שלום אורח, בשביל לעזור עלייך קודם כל להירשם למערכת. הינך מועבר לדף ההרשמה'});
  } 
  clearMsg(){
    this.msgs = [];
  }

}
