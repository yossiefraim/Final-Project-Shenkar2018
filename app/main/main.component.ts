import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../services/application.service';
import { OfferService } from '../services/offer.service';
import { Router } from '@angular/router';
import { UserLoginService } from '../services/user-login.service';
import { MatchServiceService } from '../services/match-service.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  
  constructor(private app:ApplicationService, private off:OfferService,private user:UserLoginService, private match:MatchServiceService, private router:Router){}

  public elements:any[]=[];
  public geolocationPosition;
  public geoTemp;
  public dataFlage;
  ngOnInit() {
    this.dataFlage=false;
    this.getRandomdata();
  }

  getRandomdata(){
    this.app.getRandomApplicationsHomepage('student',2);
    this.app.getRandomApplicationsHomepage('handyman',2);
    this.app.getRandomApplicationsHomepage('olders',2);
    this.app.getRandomApplicationsHomepage('ride',2);
    this.app.studentAppsHomepage.forEach(element => {
      this.app.handymanAppsHomepage.forEach(element => {
        this.app.olderAppsHomepage.forEach(element => {
          this.app.rideAppsHomepage.forEach(element => {
             element.forEach(elm=>{
               this.elements.push(elm);
             });
            this.elements = this.shuffle(this.elements);
          });
          element.forEach(elm=>{
            this.elements.push(elm);
          });
        });
        element.forEach(elm=>{
          this.elements.push(elm);
        });
      });
      element.forEach(elm=>{
        this.elements.push(elm);
      });
    });
    
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    this.dataFlage=true;
  return array;
  }

  productPage(element){
    this.match.setLastItem(element);
    return new Promise((resolve,reject)=>{
      this.user.getUserById(element.userId).then(res =>{
        this.router.navigate(['/item']);
        resolve();
      });   
    });
  }

}
