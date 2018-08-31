import { Component, OnInit } from '@angular/core';
import {UserLoginService} from '../services/user-login.service';
import { Router } from '@angular/router';
import {cities} from '../services/israel-cities';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  constructor(private router : Router,private user:UserLoginService) { }
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
  }

  userPass="";
  
  public userAdress = {
    city:"",
    street:"",
    houseNumber:"",
    latitude:"",
    Longitude:""
  }

  userInterest={
    ride:false,
    elderly:false,
    handyman:false,
    student:false,
  }

  tempLocation:any;
  cities:any; 
  status: string[] = [
    'רווק/ה',
    'נשוי/אה',
    'גרוש/ה',
  ]
  // interests:string;
  ngOnInit() {
    this.cities=cities;
  }
  async onSubmit(value:any){
    await this.getLocation(this.userAdress.houseNumber+' '+this.userAdress.street+' '+this.userAdress.city);

    // if(this.userInterest.elderly==true){
    //   this.interests+='olders;';
    // }
    // if(this.userInterest.handyman==true){
    //   this.interests+='handy-man;';
    // }
    // if(this.userInterest.student==true){
    //   this.interests+='student;';
    // }
    // if(this.userInterest.ride==true){
    //  this.interests+='ride;';
    // }
    //need to update here
    this.user.createUser(this.userInfo.firstName,this.userInfo.lastName,this.userContact.email,this.userPass,this.userContact.phone,this.userInfo.age,this.userInfo.familyStatus,this.userInfo.kids,this.userAdress.city,this.userAdress.street,this.userAdress.houseNumber,this.userAdress.latitude,this.userAdress.Longitude,this.userInterest);
    this.user.setUserLoggedIn();
    this.user.updateName(this.userInfo.firstName,this.userInfo.lastName);
    this.router.navigate(['home']);
    //this.user.deleteUser('oree@gmail.com','1234');
  }

  getLocation(address){
    return new Promise((resolve,reject)=>{
      this.user.getUserCoordinatesLoctionByMaps(address).then(res =>{
        this.tempLocation = res;
        this.userAdress.latitude = this.tempLocation.results[0].geometry.location.lat;
      this.userAdress.Longitude = this.tempLocation.results[0].geometry.location.lng;
      resolve();
      });
    });
  }

}
