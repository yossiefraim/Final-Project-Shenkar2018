import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  public userInfo = {
    firstName:"",
    lastName:"",
    age:"",
    status:"",
  }
  public userContact = {
    phone:"",
    email:"",
  }

  userPass="";
  
  public userAdress = {
    city:"",
    street:"",
  }

  userInterest="";


  cities: string[] = [
    'ראשון לציון',
    'רחובות',
    'ירושלים',
  ]
  status: string[] = [
    'רווק/ה',
    'נשוי/אה',
    'גרוש/ה',
  ]
  interests:string[] = [
    'טרמפים',
    'עזרה לקשיש',
    'הנדימן',
    'עזרה לתלמיד',
  ]
  onSubmit(value:any){

  }
  constructor() { }

  ngOnInit() {
  }

}
