import { Component, OnInit } from '@angular/core';
import { OfferService } from '../services/offer.service';
import { ApplicationService } from '../services/application.service';
import { UserLoginService } from '../services/user-login.service';
import { Router } from '@angular/router';
import { MatchServiceService } from '../services/match-service.service';
import {cities} from '../services/israel-cities';



@Component({
  selector: 'elderly-form',
  templateUrl: './elderly-form.component.html',
  styleUrls: ['./elderly-form.component.css']
})
export class ElderlyFormComponent implements OnInit {

  constructor(private off:OfferService,private app:ApplicationService,private user:UserLoginService,private match:MatchServiceService, private router:Router) { }

  ngOnInit() {
    this.getOlderApplications();
    this.getOlderOffers();
    this.getSuggestions();
    this.cities=cities;
    this.info.city="בחר עיר...";
  }
  public info = {
    city:"",
    street:"",
    houseNumber:"",
    gender:"",
    language:"",
    title:"",
    description:"",
    latitude:"",
    Longitude:""
  }

  public timeInfo = {
    startTimeDate:"",
    startTimeHour:"",
    startTime:"",
  }
  
  userInterest={
    option1:false,
    option2:false,
    option3:false,
    option4:false,
    isOffer:false,
    isApplication:true
  }
  tempLocation:any;
  randomImg:any;
  randomElderlyApps:any[]=[];
  randomElderlyOffs:any[]=[];
  olderSuggestionsApplication:any[]=[];
  public searchText;
  cities: any;

  genders: string[] = [
    'לא משנה',
    'זכר',
    'נקבה'
  ]
  
  languages: string[] = [
    'לא משנה',
    'אנגלית',
    'אמהרית',
    'עברית',
    'ערבית',
    'רוסית'
  ]
  
  async onSubmit(value:any){
    this.randomImg=this.getRandomImg();
    await this.getLocation(this.info.houseNumber+' '+this.info.street+' '+this.info.city);
    this.timeInfo.startTime=this.timeInfo.startTimeDate+'T'+this.timeInfo.startTimeHour+':00Z';
    let data: any = {
      "userId":this.user.getUserId(),
      "period":this.timeInfo.startTime,
      "urgency":false,
      "userLocation":this.user.getUserContact().city,
      "gender":this.info.gender,
      "language":this.info.language,
      "img":this.randomImg,
      "title":this.info.title,
      "description":this.info.description,
      "shopping":this.userInterest.option1,
      "cooking":this.userInterest.option2,
      "escortedAged":this.userInterest.option3,
      "conversation":this.userInterest.option4,
      "status":"",
      "city":this.info.city,
      "street":this.info.street,
      "houseNumber":this.info.houseNumber,
      "latitude":this.info.latitude,
      "Longitude":this.info.Longitude
    }
   if (this.userInterest.isApplication){
    this.app.createOldersApplication(data);
    data.status="ממתין למציאת התאמה";
    data.period=this.timeInfo.startTimeDate+' '+this.timeInfo.startTimeHour;
    data.category="olders";
    this.match.setManualApplication(data);
    confirm(this.user.getUserName()+",הצעתך נרשמה!");
    this.router.navigate(['/userHome']);
   }else{
    let key ="urgency";
    delete data[key];
    this.off.createOldersOffer(data);
    data.status="ממתין למציאת התאמה";
    data.period=this.timeInfo.startTimeDate+' '+this.timeInfo.startTimeHour;
    data.category="olders";
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
  checkBoxChange(id){
    switch (id) {
      case 1:
      this.userInterest.option1=true;
      this.userInterest.option2=false;
      this.userInterest.option3=false;
      this.userInterest.option4=false;
        break;
      case 2:
      this.userInterest.option1=false;
      this.userInterest.option2=true;
      this.userInterest.option3=false;
      this.userInterest.option4=false;
        break;
      case 3:
      this.userInterest.option1=false;
      this.userInterest.option2=false;
      this.userInterest.option3=true;
      this.userInterest.option4=false;
        break;
      case 4:
      this.userInterest.option1=false;
      this.userInterest.option2=false;
      this.userInterest.option3=false;
      this.userInterest.option4=true;
        break;
    }
  }
  getOlderApplications(){
    this.app.getRandomApplications('olders',6,this.user.getUserId());
    this.app.olderApps.forEach(element => {
      element.forEach(elm=>{
        this.randomElderlyApps.push(elm);
      });
    });
  }
  getOlderOffers(){
    this.off.getRandomOffers('olders',6,this.user.getUserId());
    this.off.olderOffers.forEach(element => {
      element.forEach(elm=>{
        this.randomElderlyOffs.push(elm);
      });
    });
  }
  getSuggestions(){
    this.app.getSuggestionsApplication(this.user.getUserId());
    this.app.suggestionsApplication.forEach(element => {
      element.forEach(elm=>{
        this.olderSuggestionsApplication.push(elm);
      });
    });
  }
  
  productPage(element){
    this.match.setLastItem(element);
    if(element.applicationID!=null){
      this.app.addUserAppInterests(element.applicationID,'olders',this.user.getUserId());
    }else{
      this.off.addUserOffInterests(element.offerId,'olders',this.user.getUserId());
    }
    return new Promise((resolve,reject)=>{
      this.user.getUserById(element.userId).then(res =>{
        this.router.navigate(['/item']);
        resolve();
      });   
    });
  }
  getLocation(address){
    return new Promise((resolve,reject)=>{
      this.user.getUserCoordinatesLoctionByMaps(address).then(res =>{
        this.tempLocation = res;
        this.info.latitude = this.tempLocation.results[0].geometry.location.lat;
        this.info.Longitude = this.tempLocation.results[0].geometry.location.lng;
      resolve();
    });
    });
  }
  getRandomImg(){
    if(this.userInterest.option1){
      return Math.floor(Math.random() * Math.floor(3))
    }else if(this.userInterest.option2){
      return Math.floor(Math.random() * Math.floor(3)+3)
    }else if(this.userInterest.option3){
      return Math.floor(Math.random() * Math.floor(4)+7)
    }else if(this.userInterest.option4){
      return Math.floor(Math.random() * Math.floor(4)+12)
    }
  }
  updateAddress(){
    this.info.city=this.user.updateCity;
    this.info.street=this.user.updateAddress;
    this.info.houseNumber=this.user.updateHouseNumber;
  }
  

}
