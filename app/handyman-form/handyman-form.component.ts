import { Component, OnInit,NgModule } from '@angular/core';
import { OfferService } from '../services/offer.service';
import { ApplicationService } from '../services/application.service';
import { UserLoginService } from '../services/user-login.service';
import {Router } from '@angular/router';
import { MatchServiceService } from '../services/match-service.service';
import {cities} from '../services/israel-cities';



@Component({
  selector: 'handyman-form',
  templateUrl: './handyman-form.component.html',
  styleUrls: ['./handyman-form.component.css']
})
export class HandymanFormComponent implements OnInit {

  constructor(private off:OfferService,private app:ApplicationService,private user:UserLoginService,private match:MatchServiceService, private router: Router) { }

  ngOnInit() {
    this.getRandomHandymanApps();
    this.getRandomHandymanOffs();
    this.getSuggestions();
    this.info.city="בחר עיר...";
    this.cities=cities;
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
  
  public userInterest={
    option1:false,
    option2:false,
    option3:false,
    option4:false,
    option5:false,
    isOffer:false,
    isApplication:true

  }

  public randomHandyManApps:any[]=[];
  public randomHandyManOffs:any[]=[];
  public handymanSuggestionsApplication:any[]=[];
  public searchText;

  tempLocation:any;
  cities: any;
  randomImg:any;

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
      "gender":this.info.gender,
      "language":this.info.language,
      "img":this.randomImg,
      "title":this.info.title,
      "description":this.info.description,
      "colorCorrections":this.userInterest.option1,
      "furniture":this.userInterest.option2,
      "generalHangingWorks":this.userInterest.option3,
      "hangingOfLightFixtures":this.userInterest.option4,
      "treatmentSocketsAndPowerPoints":this.userInterest.option5,
      "status":"",
      "city":this.info.city,
      "street":this.info.street,
      "houseNumber":this.info.houseNumber,
      "latitude":this.info.latitude,
      "Longitude":this.info.latitude
    }

    if (this.userInterest.isApplication){
      this.app.createHandymanApplication(data);
      data.status="ממתין למציאת התאמה";
      data.period=this.timeInfo.startTimeDate+' '+this.timeInfo.startTimeHour;
      data.category="handyman";
      this.match.setManualApplication(data);
      confirm(this.user.getUserName()+",בקשתך נרשמה!");
      this.router.navigate(['/userHome']);
     }else{
      let key ="urgency";
      delete data[key];
      this.off.createHandymanOffer(data);
      data.status="ממתין למציאת התאמה";
      data.period=this.timeInfo.startTimeDate+' '+this.timeInfo.startTimeHour;
      data.category="handyman";
      this.match.setManualOffer(data);
      confirm(this.user.getUserName()+",הצעתך נרשמה!");
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
      this.userInterest.option5=false;
        break;
      case 2:
      this.userInterest.option1=false;
      this.userInterest.option2=true;
      this.userInterest.option3=false;
      this.userInterest.option4=false;
      this.userInterest.option5=false;
        break;
      case 3:
      this.userInterest.option1=false;
      this.userInterest.option2=false;
      this.userInterest.option3=true;
      this.userInterest.option4=false;
      this.userInterest.option5=false;
        break;
      case 4:
      this.userInterest.option1=false;
      this.userInterest.option2=false;
      this.userInterest.option3=false;
      this.userInterest.option4=true;
      this.userInterest.option5=false;
        break;
      case 5:
        this.userInterest.option1=false;
        this.userInterest.option2=false;
        this.userInterest.option3=false;
        this.userInterest.option4=false;
        this.userInterest.option5=true;
          break;
    }
  }
  getRandomHandymanApps(){
    this.app.getRandomApplications('handyman',6,this.user.getUserId());
    this.app.handymanApps.forEach(element => {
      element.forEach(elm=>{
        this.randomHandyManApps.push(elm);
      });
    });
  }
  getRandomHandymanOffs(){
    this.off.getRandomOffers('handyman',6,this.user.getUserId());
    this.off.handymanOffers.forEach(element => {
      element.forEach(elm=>{
        this.randomHandyManOffs.push(elm);
      });
    });
  }
  getSuggestions(){
    this.app.getSuggestionsApplication(this.user.getUserId());
    this.app.suggestionsApplication.forEach(element => {
      element.forEach(elm=>{
        this.handymanSuggestionsApplication.push(elm);
      });
    });
  }
  productPage(element){
    this.match.setLastItem(element);
    if(element.applicationID!=null){
      this.app.addUserAppInterests(element.applicationID,'handyman',this.user.getUserId());
    }else{
      this.off.addUserOffInterests(element.offerId,'handyman',this.user.getUserId());
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
      return Math.floor(Math.random() * Math.floor(5)+17)
    }else if(this.userInterest.option2){
      return Math.floor(Math.random() * Math.floor(4)+22)
    }else if(this.userInterest.option3){
      return Math.floor(Math.random() * Math.floor(5)+27)
    }else if(this.userInterest.option4){
      return Math.floor(Math.random() * Math.floor(4)+32)
    }else if(this.userInterest.option5){
      return Math.floor(Math.random() * Math.floor(4)+32)
    }
  }
  updateAddress(){
    this.info.city=this.user.updateCity;
    this.info.street=this.user.updateAddress;
    this.info.houseNumber=this.user.updateHouseNumber;
  } 
}
