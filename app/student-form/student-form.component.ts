import { Component, OnInit,NgModule } from '@angular/core';
import {UserLoginService} from '../services/user-login.service';
import { OfferService } from '../services/offer.service';
import { ApplicationService } from '../services/application.service';
import { Router } from '@angular/router';
import { MatchServiceService } from '../services/match-service.service';
import {cities} from '../services/israel-cities';



@Component({
  selector: 'student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  constructor(private user:UserLoginService,private off:OfferService, private app:ApplicationService,private match:MatchServiceService, private router:Router) { }
  ngOnInit() {
    this.getRandomStudentApps();
    this.getRandomStudentOffs();
    this.getSuggestions();
    this.userContact.city="בחר עיר...";
    this.cities=cities;
  }

  public userInfo = {
    education:"",
    profession:"",
    language:"",
    gender:"",
    title:"",
    description:""
  }

  public userContact = {
    city:"",
    street:"",
    houseNumber:"",
    latitude:"",
    Longitude:""
  }
  public timeInfo = {
    startTimeDate:"",
    startTimeHour:"",
    startTime:"",
  }
  userInterest={
    homework:false,
    test:false,
    training:false,
    isOffer:false,
    isApplication:true
  }
  tempLocation:any;
  public randomStudentApps:any[]=[];
  public randomStudentOffs:any[]=[];
  public studentSuggestionsApplication:any[]=[];
  public searchText;
  educations: string[] = [
    'ביה"ס יסודי',
    'חטיבת ביניים ',
    'חטיבה עליונה',
    'סטודנט',
    'בוגר תואר',
  ]
  professions: string[] = [
    'אזרחות',
    'אנגלית',
    'היסטוריה',
    'לשון',
    'מתמטיקה',
    'ספרות',
    'תנ"ך'

  ]
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
    await this.getLocation(this.userContact.houseNumber+' '+this.userContact.street+' '+this.userContact.city);
    this.timeInfo.startTime=this.timeInfo.startTimeDate+'T'+this.timeInfo.startTimeHour+':00Z';

    let data:any = {
      "userId":this.user.getUserId(),
      "period":this.timeInfo.startTime,
      "city":this.userContact.city,
      "street":this.userContact.street,
      "houseNumber":this.userContact.houseNumber,
      "latitude":this.userContact.latitude,
      "Longitude":this.userContact.Longitude,
      "urgency":false,
      "userLocation":this.user.getUserContact().city,
      "gender":this.userInfo.gender,
      "language":this.userInfo.language,
      "img":Math.floor(Math.random() * Math.floor(5)+41),
      "title":this.userInfo.title,
      "description":this.userInfo.description,
      "educationLevel":this.userInfo.education,
      "fieldOfStudy":this.userInfo.profession,
      "homeWorks":this.userInterest.homework,
      "testStudy":this.userInterest.test,
      "practice":this.userInterest.training,
      "status":""
    }
    
   
    if (this.userInterest.isApplication){
      this.app.createStudentApplication(data);
      data.status="ממתין למציאת התאמה";
      data.period=this.timeInfo.startTimeDate+' '+this.timeInfo.startTimeHour;
      data.category="student";
      this.match.setManualApplication(data);
      confirm(this.user.getUserName()+",בקשתך נרשמה!");
      this.router.navigate(['/userHome'])
     }else{
      let key ="urgency";
      delete data[key];
      this.off.createStudentOffer(data);
      data.status="ממתין למציאת התאמה";
      data.period=this.timeInfo.startTimeDate+' '+this.timeInfo.startTimeHour;
      data.category="student";
      this.match.setManualOffer(data);
      confirm(this.user.getUserName()+",הצעתך נרשמה!");
      this.router.navigate(['/userHome']);
     }
  }
  onChangeButton(temp){
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
      this.userInterest.homework=true;
      this.userInterest.test=false;
      this.userInterest.training=false;
        break;
      case 2:
      this.userInterest.homework=false;
      this.userInterest.test=true;
      this.userInterest.training=false;
        break;
      case 3:
      this.userInterest.homework=false;
      this.userInterest.test=false;
      this.userInterest.training=true;
        break;
    }
  }
  getRandomStudentApps(){
    this.app.getRandomApplications('student',6,this.user.getUserId());
    this.app.studentApps.forEach(element => {
      element.forEach(elm=>{
        this.randomStudentApps.push(elm);
      });
    });
  }
  getRandomStudentOffs(){
    this.off.getRandomOffers('student',6,this.user.getUserId());
    this.off.studentOffers.forEach(element => {
      element.forEach(elm=>{
        this.randomStudentOffs.push(elm);
      });
    });
  }
  getSuggestions(){
    this.app.getSuggestionsApplication(this.user.getUserId());
    this.app.suggestionsApplication.forEach(element => {
      element.forEach(elm=>{
        this.studentSuggestionsApplication.push(elm);
      });
    });
  }
  productPage(element){
    this.match.setLastItem(element);
    if(element.applicationID!=null){
      this.app.addUserAppInterests(element.applicationID,'student',this.user.getUserId());
    }else{
      this.off.addUserOffInterests(element.offerId,'student',this.user.getUserId());
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
        this.userContact.latitude = this.tempLocation.results[0].geometry.location.lat;
      this.userContact.Longitude = this.tempLocation.results[0].geometry.location.lng;
      resolve();
      });
    });
  }
  updateAddress(){
    this.userContact.city=this.user.updateCity;
    this.userContact.street=this.user.updateAddress;
    this.userContact.houseNumber=this.user.updateHouseNumber;
  }

}
