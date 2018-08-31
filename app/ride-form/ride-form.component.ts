import { Component, OnInit,NgModule } from '@angular/core';
import { OfferService } from '../services/offer.service';
import { ApplicationService } from '../services/application.service';
import { UserLoginService } from '../services/user-login.service';
import { Router } from '@angular/router';
import { MatchServiceService } from '../services/match-service.service';
import {cities} from '../services/israel-cities';


@Component({
  selector: 'ride-form',
  templateUrl: './ride-form.component.html',
  styleUrls: ['./ride-form.component.css']
})
export class RideFormComponent implements OnInit {
  constructor(private off:OfferService,private app:ApplicationService,private user:UserLoginService,private match:MatchServiceService,private router:Router) { }

  ngOnInit() {
    this.getRandomRideApps();
    this.getRandomRideOffs();
    this.getSuggestions();
    this.cities=cities;
  }
  public rideInfo = {
    startCity:"",
    startStreet:"",
    startHouseNumber:"",
    endCity:"",
    endStreet:"",
    endHouseNumber:"",
    destlatitude:"",
    destLongitude:"",
    latitude:"",
    Longitude:"",
    title:"",
    description:"",
    language:""
  }

  public timeInfo = {
    startTimeDate:"",
    startTimeHour:"",
    startTime:"",
    endTimeDate:"",
    endTimeHour:"",
    endTime:"",
  }
  public userInterest={
    isOffer:false,
    isApplication:true

  }
  tempLocation:any;
  public randomRideApps:any[]=[];
  public randomRideOffs:any[]=[];
  public rideSuggestionsApplication:any[]=[];
  public searchText;
  gender:"";

  cities: any;
  languages: string[] = [
    'לא משנה',
    'אנגלית',
    'אמהרית',
    'עברית',
    'ערבית',
    'רוסית'
  ]

  genders: string[] = [
    'לא משנה',
    'זכר',
    'נקבה'
  ]

  
  async onSubmit(value:any){
    await this.getDestLocation(this.rideInfo.endHouseNumber+' '+this.rideInfo.endStreet+' '+this.rideInfo.endCity);
    await this.getLocation(this.rideInfo.startHouseNumber+' '+this.rideInfo.startStreet+' '+this.rideInfo.startCity);
    this.timeInfo.startTime=this.timeInfo.startTimeDate+'T'+this.timeInfo.startTimeHour+':00Z';
    this.timeInfo.endTime=this.timeInfo.endTimeDate+'T'+this.timeInfo.endTimeHour+':00Z';

    let data: any = {
      "userId":this.user.getUserId(),
      "destCity":this.rideInfo.endCity,
      "destStreet":this.rideInfo.endStreet,
      "destHouseNum":this.rideInfo.endHouseNumber,
      "destlatitude":this.rideInfo.destlatitude,
      "destLongitude":this.rideInfo.destLongitude,
      "endPeriod":this.timeInfo.endTime,
      "period":this.timeInfo.startTime,
      "city":this.rideInfo.startCity,
      "street":this.rideInfo.startStreet,
      "houseNumber":this.rideInfo.startHouseNumber,
      "latitude":this.rideInfo.latitude,
      "Longitude":this.rideInfo.Longitude,
      "periodic":this.timeInfo.endTime,
      "urgency":false,
      "status":"",
      "isAprroved":false,
      "gender":this.gender,
      "language":this.rideInfo.language,
      "img":Math.floor(Math.random() * Math.floor(5)+36),
      "title":this.rideInfo.title,
      "description":this.rideInfo.description
    }

    if (this.userInterest.isApplication){
      this.app.createRideApplication(data);
      data.status="ממתין למציאת התאמה";
      data.period=this.timeInfo.startTimeDate+' '+this.timeInfo.startTimeHour;
      data.category="ride";
      this.match.setManualApplication(data);
      confirm(this.user.getUserName()+",הצעתך נרשמה!");
      this.router.navigate(['/userHome']);
     }else{
      let key ="urgency";
      delete data[key];
      this.off.createRideOffer(data);
      data.status="ממתין למציאת התאמה";
      data.period=this.timeInfo.startTimeDate+' '+this.timeInfo.startTimeHour;
      data.category="ride";
      this.match.setManualOffer(data);
      confirm(this.user.getUserName()+",בקשתך נרשמה!");
      this.router.navigate(['/userHome']);
     }
     
  }
  onChange(temp){
    if (temp=='2'){
      this.userInterest.isOffer=true;
      this.userInterest.isApplication=false;
    }else if(temp=='1'){
      this.userInterest.isOffer=false;
      this.userInterest.isApplication=true;
    }
  }
  getRandomRideApps(){
    this.app.getRandomApplications('ride',6,this.user.getUserId());
    this.app.rideApps.forEach(element => {
      element.forEach(elm=>{
        this.randomRideApps.push(elm);
      });
    });
  }
  getRandomRideOffs(){
    this.off.getRandomOffers('ride',6,this.user.getUserId());
    this.off.rideOffers.forEach(element => {
      element.forEach(elm=>{
        this.randomRideOffs.push(elm);
      });
    });
  }
  getSuggestions(){
    this.app.getSuggestionsApplication(this.user.getUserId());
    this.app.suggestionsApplication.forEach(element => {
      element.forEach(elm=>{
        this.rideSuggestionsApplication.push(elm);
      });
    });
  }
  
  productPage(element){
    this.match.setLastItem(element);
    if(element.applicationID!=null){
      this.app.addUserAppInterests(element.applicationID,'ride',this.user.getUserId());
    }else{
      this.off.addUserOffInterests(element.offerId,'ride',this.user.getUserId());
    }
    return new Promise((resolve,reject)=>{
      this.user.getUserById(element.userId).then(res =>{
        this.router.navigate(['/item']);
        resolve();
      });   
    });
  }
  getDestLocation(address){
    return new Promise((resolve,reject)=>{
      this.user.getUserCoordinatesLoctionByMaps(address).then(res =>{
        this.tempLocation = res;
        this.rideInfo.destlatitude = this.tempLocation.results[0].geometry.location.lat;
      this.rideInfo.destLongitude= this.tempLocation.results[0].geometry.location.lng;
      resolve();
      });
    });
  }
  getLocation(address){
    return new Promise((resolve,reject)=>{
      this.user.getUserCoordinatesLoctionByMaps(address).then(res =>{
        this.tempLocation = res;
        this.rideInfo.latitude = this.tempLocation.results[0].geometry.location.lat;
      this.rideInfo.Longitude = this.tempLocation.results[0].geometry.location.lng;
      resolve();
      });
    });
  }

}
