import { Component, OnInit, NgModule } from '@angular/core';
import {UserLoginService } from '../services/user-login.service';
import {Olders} from '../services/olders';
import { ApplicationService } from '../services/application.service';
import { OfferService } from '../services/offer.service';
import {Router } from '@angular/router';
import { MatchServiceService } from '../services/match-service.service';
import {cities} from '../services/israel-cities';
import {Message} from 'primeng/components/common/api';
import {RatingModule} from 'primeng/rating';





@Component({
  selector: 'user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  
  public userInfo = {
    firstName:"",
    lastName:"",
    age:"",
    kids:"",
    familyStatus:"",
  }
  public userContact = {
    phone:"",
    email:"",
    city:"",
    street:"",
    houseNumber:"",
    latitude:"",
    longitude:""
  }

  userPass="";


  userInterest={
    ride:false,
    elderly:false,
    handyman:false,
    student:false,
  }
  public matchUserInfo = {
    firstName:"",
    lastName:"",
    phone:"",
    mail:"",
  }
  public i=0;
  public old;
  public searchText;
  public tempLocation;

  cities: any;
  status: string[] = [
    'רווק/ה',
    'נשוי/אה',
    'גרוש/ה',
  ]
  public dataFlage;
  public applications: any[] =[];
  public randomItems:any[]=[];
  public applicationsCategory:any[] = [];
  public offers: any[] =[];
  public offersCategory:any[] = [];
  public matchOffersCategory:any[] = [];
  public matchApplicationsCategory:any[] = [];
  public elements:any[]=[];
  public userApp;
  public userUpdateLocation:any;
  public geolocationPosition;
  public showApproveAppButton:any[]=[];
  public showDeclineAppButton:any[]=[];
  public showDetailsAppButton:any[]=[];
  public showInfoAppButton:any[]=[];
  public showApproveOffButton:any[]=[];
  public showDeclineOffButton:any[]=[];
  public showDetailsOffButton:any[]=[];
  public showInfoOffButton:any[]=[];
  public showMatchAppButton:any[]=[];
  public showMatchOffButton:any[]=[];
  public matchOffers:any[]=[];
  public matchApplications:any[]=[];
  public usersMatchOffers:any[]=[];
  public usersMatchApplications:any[]=[];
  public contactUserApp:any;
  public contactUserOffer:any;
  public offerColors:any[]=[];
  public applicationColors:any[]=[];
  public usersMatchOfferColors:any[]=[];
  public usersMatchApplicationColors:any[]=[];
  public userMatchApplicationDataFlag=false;
  public userMatchOfferDataFlag=false;
  public msgs: Message[] = [];
  public rateMsg:string;
  public ratingVal=5;

  constructor(private user:UserLoginService,private app:ApplicationService, private off:OfferService,private match:MatchServiceService,  private router: Router)  { }
  
  ngOnInit() {
    this.cities=cities;
    this.dataFlage=false;
    this.getRandomdata();
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
          position => {
              this.geolocationPosition = position;
              console.log("cord position = "+position.coords.latitude+','+position.coords.longitude);
                  this.user.getUserAddressLoctionByMaps(position.coords.latitude+','+position.coords.longitude).then(res=>{
                    this.userUpdateLocation=this.user.getUserAdreessUpdateLocation();
                    this.user.setUserContact(this.user.getUserContact().email,this.user.getUserContact().phone,this.userUpdateLocation.results[0].address_components[2].long_name,this.userUpdateLocation.results[0].address_components[1].long_name,this.userUpdateLocation.results[0].address_components[0].long_name);
                    console.log("cord address = "+this.userUpdateLocation.results[0].address_components[2].long_name+' '+this.userUpdateLocation.results[0].address_components[1].long_name+' '+this.userUpdateLocation.results[0].address_components[0].long_name);
                    let house=this.userUpdateLocation.results[0].address_components[0].long_name;
                    this.user.updateCity=this.userUpdateLocation.results[0].address_components[2].long_name;
                    this.user.updateAddress=this.userUpdateLocation.results[0].address_components[1].long_name;
                    this.user.updateHouseNumber=this.userUpdateLocation.results[0].address_components[0].long_name;
                    if(!house){
                      house=1;
                    }
                    this.user.updateUserLocationByMaps(this.user.getUserId(),this.userUpdateLocation.results[0].address_components[2].long_name,this.userUpdateLocation.results[0].address_components[1].long_name,house,position.coords.latitude,position.coords.longitude);
                  })
              },
          error => {
              switch (error.code) {
                  case 1:
                      console.log('Permission Denied');
                      break;
                  case 2:
                      console.log('Position Unavailable');
                      break;
                  case 3:
                      console.log('Timeout');
                      break;
              }
          }
      );
  };
    this.userInfo.firstName = this.user.getUserInfo().firstName;
    this.userInfo.lastName = this.user.getUserInfo().lastName;
    this.userInfo.age = this.user.getUserInfo().age;
    this.userInfo.kids = this.user.getUserInfo().kids;
    this.userInfo.familyStatus = this.user.getUserInfo().familyStatus;
    this.userContact.email = this.user.getUserContact().email.toLocaleLowerCase();
    this.userContact.street = this.user.getUserContact().street;
    this.userContact.city = this.user.getUserContact().city;
    this.userContact.houseNumber = this.user.getUserContact().houseNumber;
    this.userContact.phone = this.user.getUserContact().phone;
    this.userPass = this.user.getUserPass();
    this.userInterest.elderly = this.user.getUserInterest().elderly;
    this.userInterest.student = this.user.getUserInterest().student;
    this.userInterest.ride = this.user.getUserInterest().ride;
    this.userInterest.handyman = this.user.getUserInterest().handyman;
    

    if(this.user.getUserOffers()!=null){
      this.offers = this.user.getUserOffers();
    }
    if(this.match.getManualOffer()!=null) this.offers.push(this.match.getManualOffer());

    if(this.user.getUserApplications()!=null){
      this.applications = this.user.getUserApplications();
    } 
    if(this.match.getManualApplication()!=null) this.applications.push(this.match.getManualApplication());

    if(this.user.getUserMatchOffers()!=null){
      this.matchOffers = this.user.getUserMatchOffers();
    }
    if(this.matchOffers.length==0) this.userMatchOfferDataFlag=true;
    if(this.match.getMatchOffer()!=null) this.matchOffers.push(this.match.getMatchOffer());

    if(this.user.getUserMatchApplications()!=null){
      this.matchApplications = this.user.getUserMatchApplications();
    }
    if(this.matchApplications.length==0) this.userMatchApplicationDataFlag=true;
    if(this.match.getMatchApplication()!=null) this.matchApplications.push(this.match.getMatchApplication());

    //this.contactUserApp = this.user.getUserAppMatchContact();
   // this.contactUserOffer = this.user.getUserOffMatchContact();

    if(this.offers){
    this.offers.forEach(offer => {
      switch(offer.status){
        case 'ממתין למציאת התאמה':
        this.offerColors.push('table-warning');
        this.showApproveOffButton.push(false);
        this.showDeclineOffButton.push(false);
        this.showDetailsOffButton.push(false);
        this.showInfoOffButton.push(false);
          break;
        case 'שני הצדדים אישרו את ההתאמה':
          this.offerColors.push('table-success');
          this.showApproveOffButton.push(false);
          this.showDeclineOffButton.push(true);
          this.showDetailsOffButton.push(true);
          this.showInfoOffButton.push(true);
          break;
        case 'ממתין לאישור שני הצדדים':
          this.offerColors.push('table-success');
          this.showApproveOffButton.push(true);
          this.showDeclineOffButton.push(true);
          this.showDetailsOffButton.push(true);
          this.showInfoOffButton.push(false);
          break;
        case 'ממתין לאישורך':
          this.offerColors.push('table-info');
          this.showApproveOffButton.push(true);
          this.showDeclineOffButton.push(true);
          this.showDetailsOffButton.push(true);
          this.showInfoOffButton.push(false);
          break;
        case 'ממתין לאישור מציע העזרה':
          this.offerColors.push('table-primary');
          this.showApproveOffButton.push(false);
          this.showDeclineOffButton.push(true);
          this.showDetailsOffButton.push(true);
          this.showInfoOffButton.push(false);
          break;
        case 'מציע העזרה דחה את ההתאמה':
          this.offerColors.push('table-danger');
          this.showApproveOffButton.push(false);
          this.showDeclineOffButton.push(false);
          this.showDetailsOffButton.push(false);
          this.showInfoOffButton.push(false);
          break;
      }
      switch (offer.category) {
        case 'ride':
        this.offersCategory.push('טרמפים');
          break;
        case 'olders':
        this.offersCategory.push('עזרה לקשיש');
          break;
        case 'handyman':
        this.offersCategory.push('הנדימן');
          break;
        case 'student':
        this.offersCategory.push('עזרה לתלמיד');
          break;
      }
    });
    }
    if(this.applications){
    this.applications.forEach(application => {
      switch(application.status){
        case 'ממתין למציאת התאמה':
        this.applicationColors.push('table-warning');
        this.showApproveAppButton.push(false);
        this.showDeclineAppButton.push(false);
        this.showDetailsAppButton.push(false);
        this.showInfoAppButton.push(false);
          break;
        case 'שני הצדדים אישרו את ההתאמה':
          this.applicationColors.push('table-success');
          this.showApproveAppButton.push(false);
          this.showDeclineAppButton.push(true);
          this.showDetailsAppButton.push(true);
          this.showInfoAppButton.push(true);
          break;
        case 'ממתין לאישור שני הצדדים':
          this.applicationColors.push('table-success');
          this.showApproveAppButton.push(true);
          this.showDeclineAppButton.push(true);
          this.showDetailsAppButton.push(true);
          this.showInfoAppButton.push(false);
          break;
        case 'ממתין לאישורך':
          this.applicationColors.push('table-info');
          this.showApproveAppButton.push(true);
          this.showDeclineAppButton.push(true);
          this.showDetailsAppButton.push(true);
          this.showInfoAppButton.push(false);
          break;
        case 'ממתין לאישור מבקש העזרה':
          this.applicationColors.push('table-primary');
          this.showApproveAppButton.push(false);
          this.showDeclineAppButton.push(true);
          this.showDetailsAppButton.push(true);
          this.showInfoAppButton.push(false);
          break;
        case 'מציע העזרה דחה את ההתאמה':
          this.applicationColors.push('table-danger');
          this.showApproveAppButton.push(false);
          this.showDeclineAppButton.push(false);
          this.showDetailsAppButton.push(false);
          this.showInfoAppButton.push(false);
          break;
      }
      switch (application.category) {
        case 'ride':
        this.applicationsCategory.push('טרמפים');
          break;
        case 'olders':
        this.applicationsCategory.push('עזרה לקשיש');
          break;
        case 'handyman':
        this.applicationsCategory.push('הנדימן');
          break;
        case 'student':
        this.applicationsCategory.push('עזרה לתלמיד');
          break;
      }
    });

    if(this.matchOffers){
    this.matchOffers.forEach((offer,index) => {
      this.user.getOffMatchUserById(offer.userId);
      switch(offer.status){
        case 'ממתין למציאת התאמה':
        this.usersMatchOfferColors.push('table-warning');
        this.showMatchOffButton.push(false);
          break;
        case 'שני הצדדים אישרו את ההתאמה':
          this.usersMatchOfferColors.push('table-success');
          this.showMatchOffButton.push(false);
          break;
        case 'ממתין לאישור שני הצדדים':
          this.usersMatchOfferColors.push('table-primary');
          this.showMatchOffButton.push(true);
          break;
        case 'ממתין לאישורך':
          this.matchOffers[index].status='ממתין לאישור מציע העזרה';
          this.usersMatchOfferColors.push('table-primary');
          this.showMatchOffButton.push(true);
          break;
        case 'ממתין לאישור מציע העזרה':
          this.usersMatchOfferColors.push('table-primary');
          this.showMatchOffButton.push(false);
          break;
        case 'מציע העזרה דחה את ההתאמה':
          this.usersMatchOfferColors.push('table-danger');
          this.showMatchOffButton.push(false);
          break;
      }
      switch (offer.category) {
        case 'ride':
        this.matchOffersCategory.push('טרמפים');
          break;
        case 'olders':
        this.matchOffersCategory.push('עזרה לקשיש');
          break;
        case 'handyman':
        this.matchOffersCategory.push('הנדימן');
          break;
        case 'student':
        this.matchOffersCategory.push('עזרה לתלמיד');
          break;
      }
    });
    this.usersMatchOffers=this.user.getOffUserMatchById();
    }
  }

    if(this.matchApplications){
    this.matchApplications.forEach((application,index) => {
      switch(application.status){
        case 'ממתין למציאת התאמה':
        this.usersMatchApplicationColors.push('table-warning');
        this.showMatchAppButton.push(false);
          break;
        case 'שני הצדדים אישרו את ההתאמה':
          this.usersMatchApplicationColors.push('table-success');
          this.showMatchAppButton.push(false);
          break;
        case 'ממתין לאישור שני הצדדים':
          this.usersMatchApplicationColors.push('table-primary');
          this.showMatchAppButton.push(true);
          break;
        case 'ממתין לאישורך':
        this.matchApplications[index].status='ממתין לאישור מבקש העזרה';
          this.usersMatchApplicationColors.push('table-primary');
          this.showMatchAppButton.push(true);
          break;
        case 'ממתין לאישור מבקש העזרה':
          this.usersMatchApplicationColors.push('table-primary');
          this.showMatchAppButton.push(false);
          break;
        case 'מציע העזרה דחה את ההתאמה':
          this.usersMatchApplicationColors.push('table-danger');
          this.showMatchAppButton.push(false);
          break;
      }   
      this.user.getAppMatchUserById(application.userId);
      switch (application.category) {
        case 'ride':
        this.matchApplicationsCategory.push('טרמפים');
          break;
        case 'olders':
        this.matchApplicationsCategory.push('עזרה לקשיש');
          break;
        case 'handyman':
        this.matchApplicationsCategory.push('הנדימן');
          break;
        case 'student':
        this.matchApplicationsCategory.push('עזרה לתלמיד');
          break;
      }
    });
    
  }
  this.usersMatchApplications=this.user.getAppUserMatchById();
  }
  
  acceptOffManualMatch(offer,i){
    this.match.acceptOfferManualMatch('accept',offer.category,'offer',offer.offerId);
    switch (this.offers[i].status) {
      case 'ממתין לאישורך':
      this.offerColors[i]='table-success';
      this.offers[i].status='שני הצדדים אישרו את ההתאמה';
      this.showApproveOffButton[i]=false;
      this.showDeclineOffButton[i]=true;
      this.showDetailsOffButton[i]=true;
      this.showSuccessMsg();
        break;
      case 'ממתין לאישור שני הצדדים':
        this.offerColors[i]='table-primary';
        this.offers[i].status='ממתין לאישור מבקש העזרה';
        this.showApproveOffButton[i]=true;
        this.showDeclineOffButton[i]=true;
        this.showDetailsOffButton[i]=true;
        this.showSuccessMsg();
          break;
    }
    // this.offerColors[i]='table-success';
    // this.offers[i].status='שני הצדדים אישרו את ההתאמה'
    // this.showSuccessMsg();
  }
  acceptAppManualMatch(app,i){
    this.match.acceptApplicationManualMatch('accept',app.category,'application',app.applicationID);
    switch (this.applications[i].status) {
      case 'ממתין לאישורך':
      this.applicationColors[i]='table-success';
      this.applications[i].status='שני הצדדים אישרו את ההתאמה'
      this.showApproveAppButton[i]=false;
      this.showDeclineAppButton[i]=true;
      this.showDetailsAppButton[i]=true;
      this.showSuccessMsg();
        break;
      case 'ממתין לאישור שני הצדדים':
        this.applicationColors[i]='table-primary';
        this.applications[i].status='ממתין לאישור מציע העזרה';
        this.showApproveAppButton[i]=true;
        this.showDeclineAppButton[i]=true;
        this.showDetailsAppButton[i]=true;
        this.showSuccessMsg();
          break;
    }
    // this.applicationColors[i]='table-success';
    // this.applications[i].status='שני הצדדים אישרו את ההתאמה'
    // this.showSuccessMsg();
  }
  declineOffManualMatch(offer,i){
    this.match.acceptOfferManualMatch('decline',offer.category,'offer',offer.offerId);
    this.offerColors[i]='table-warning';
    this.offers[i].status='ממתין למציאת התאמה';
    this.showApproveOffButton[i]=false;
    this.showDeclineOffButton[i]=false;
    this.showDetailsOffButton[i]=false;
    this.showErrorMsg();
  }
  declineAppManualMatch(app,i){
    this.match.acceptApplicationManualMatch('decline',app.category,'application',app.applicationID);
    this.applicationColors[i]='table-warning';
    this.applications[i].status='ממתין למציאת התאמה';
    this.showApproveAppButton[i]=false;
    this.showDeclineAppButton[i]=false;
    this.showDetailsAppButton[i]=false;
    this.showErrorMsg();
  }
  deleteApplication(app,i){
    if(confirm(this.user.getUserName()+",האם אתה בטוח שאתה רוצה למחוק את בקשה זו?")) {
      this.applications.splice(i,1);
      this.match.deleteApplication('delete',app.category,app.applicationID); 
      }
  }
  deleteOffer(offer,i){
   if(confirm(this.user.getUserName()+",האם אתה בטוח שאתה רוצה למחוק את הצעה זו?")) {
      this.offers.splice(i,1);
      this.match.deleteOffer('delete',offer.category,offer.offerId); 
      }
    }
  getUserAppById(){
    this.app.getApplicationById('student',2);
    return this.app.applications;
  }
  getRandomdata(){
    this.off.getRandomOffers('student',3,this.user.getUserId());
    this.off.getRandomOffers('handyman',3,this.user.getUserId());
    this.off.getRandomOffers('olders',3,this.user.getUserId());
    this.off.getRandomOffers('ride',3,this.user.getUserId());
    this.off.studentOffers.forEach(element => {
      this.off.handymanOffers.forEach(element => {
        this.off.olderOffers.forEach(element => {
          this.off.rideOffers.forEach(element => {
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
   // this.randomItems.push(this.app.applications);
   // this.randomItems.push(this.off.offers);
    //return this.randomItems;
  }
  async onSubmit(value:any){
    if(confirm(this.user.getUserName()+",אתה בטוח שתרצה לעדכן את פרטייך?")) {
      await this.getLocation(this.userContact.houseNumber+' '+this.userContact.street+' '+this.userContact.city);
      this.user.updateUser(this.userInfo.firstName,this.userInfo.lastName,this.userContact.email,this.userPass,this.userContact.phone,this.userInfo.age,this.userInfo.familyStatus,this.userInfo.kids,this.userContact.city,this.userContact.street,this.userContact.houseNumber,this.userContact.latitude,this.userContact.longitude,this.userInterest);
    }
  }

  productPage(element,i){
    this.match.setLastItem(element);
    return new Promise((resolve,reject)=>{
      this.user.getUserById(element.userId).then(res =>{
        this.router.navigate(['/item']);
        resolve();
      });   
    });
  }

  appDialog(app,i){
    return new Promise((resolve,reject)=>{
      this.user.getUserApplication(app.applicationID,app.category).then(res=>{
        this.contactUserApp=res;
        this.matchUserInfo.firstName = this.contactUserApp.firstname;
        this.matchUserInfo.lastName = this.contactUserApp.lastname;
        this.matchUserInfo.mail = this.contactUserApp.mail;
        this.matchUserInfo.phone = this.contactUserApp.phone;
        resolve();
      });
    });
  }
  offDialog(off,i){
      return new Promise((resolve,reject)=>{
        this.user.getUserOffer(off.offerId,off.category).then(res=>{
          this.contactUserOffer=res;
          this.matchUserInfo.firstName = this.contactUserOffer.firstname;
          this.matchUserInfo.lastName = this.contactUserOffer.lastname;
          this.matchUserInfo.mail = this.contactUserOffer.mail;
          this.matchUserInfo.phone = this.contactUserOffer.phone;
          resolve();
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
  getLocation(address){
    return new Promise((resolve,reject)=>{
      this.user.getUserCoordinatesLoctionByMaps(address).then(res =>{
        this.tempLocation = res;
        this.userContact.latitude = this.tempLocation.results[0].geometry.location.lat;
      this.userContact.longitude = this.tempLocation.results[0].geometry.location.lng;
      resolve();
      });
    });
  }
  showSuccessMsg(){
    this.msgs.push({severity:'success', summary:'התאמה', detail:'!התאמה אושרה'});
  } 
  showErrorMsg(){
    this.msgs.push({severity:'info', summary:'התאמה', detail:'!התאמה נדחתה'});
  } 
  clearMsg(){
    this.msgs = [];
  }
  handleRate(event) {
    this.rateMsg =' הדירוג שנתנת הוא '+event.value + ' כוכבים ';
    this.ratingVal=event.value ;
  }

  handleCancel(event) {
    this.rateMsg = '!דירוג בוטל';
  }
}
