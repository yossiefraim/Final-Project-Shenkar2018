import { Injectable } from '@angular/core';
import { Olders } from '../services/olders';
import { Student } from '../services/student';
import { Ride } from '../services/ride';
import { Handyman } from '../services/handyman';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class OfferService {

  private ROOT_URL = 'https://finalproject2018.herokuapp.com';
  offers:any;
  olderOffers:any;
  rideOffers:any;
  studentOffers:any;
  handymanOffers:any;
  lastOffer:any;
  temp:any;

  private randomApp;

  constructor(private http: HttpClient) { }

  createOldersOffer(data){
   const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
   let js = 'function=create&offer='+JSON.stringify(data)+'&tableName=olders';
    this.http.post(this.ROOT_URL + '/OfferServelt',js,{headers})
    .subscribe(val=>{
    }) 
  }

  createHandymanOffer(data){
   const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
   let js = 'function=create&offer='+JSON.stringify(data)+'&tableName=handyman';
    this.http.post(this.ROOT_URL + '/OfferServelt',js,{headers})
    .subscribe(val=>{
    }) 
  }

  createStudentOffer(data){
   const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
   let js = 'function=create&offer='+JSON.stringify(data)+'&tableName=student';
    this.http.post(this.ROOT_URL + '/OfferServelt',js,{headers})
    .subscribe(val=>{
    }) 
  }

  createRideOffer(data){
   const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
   let js = 'function=create&offer='+JSON.stringify(data)+'&tableName=ride';
    this.http.post(this.ROOT_URL + '/OfferServelt',js,{headers})
    .subscribe(val=>{
    }) 
  }

  getOfferById(table,id){
    const data='function=getOffer&tableName='+table+'&offerId='+id;
     const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
     
     if(table=='student'){
      this.offers = this.http.post<Student[]>(this.ROOT_URL + '/OfferServelt',data,{headers})
      .map(res=>{
       this.lastOffer=res;
       return res;
      })
      .catch(err=>{
        return Observable.of(err);
      })
    }else if(table=='ride'){
      this.offers = this.http.post<Ride[]>(this.ROOT_URL + '/OfferServelt',data,{headers})
      .map(res=>{
       this.lastOffer=res;
       return res;
      })
      .catch(err=>{
        return Observable.of(err);
      })
    }else if(table=='olders'){
      this.offers = this.http.post<Olders[]>(this.ROOT_URL + '/OfferServelt',data,{headers})
      .map(res=>{
       this.lastOffer=res;
       return res;
      })
      .catch(err=>{
        return Observable.of(err);
      })
    }else if (table=='handyman'){
      this.offers = this.http.post<Handyman[]>(this.ROOT_URL + '/OfferServelt',data,{headers})
      .map(res=>{
       this.lastOffer=res;
       return res;
      })
      .catch(err=>{
        return Observable.of(err);
      })
    }
  }

  deleteOffer(table,id){
    const data='function=delete&tableName='+table+'&offerId='+id;
     const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
     this.http.post(this.ROOT_URL + '/OfferServelt',data,{headers})
      .subscribe(val=>{
    }) 
  }

  getRandomOffers(table,number,userId){
    const data='function=randomOffers&tableName='+table+'&number='+number+'&userId='+userId;
     const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

     if(table=='student'){
      this.studentOffers = this.http.post<Student[]>(this.ROOT_URL + '/OfferServelt',data,{headers})
      .map(res=>{
       return res;
      })
      .catch(err=>{
        return Observable.of(err);
      })
    }else if(table=='ride'){
      this.rideOffers = this.http.post<Ride[]>(this.ROOT_URL + '/OfferServelt',data,{headers})
      .map(res=>{
       return res;
      })
      .catch(err=>{
        return Observable.of(err);
      })
    }else if(table=='olders'){
      this.olderOffers = this.http.post<Olders[]>(this.ROOT_URL + '/OfferServelt',data,{headers})
      .map(res=>{
       return res;
      })
      .catch(err=>{
        return Observable.of(err);
      })
    }else if (table=='handyman'){
      this.handymanOffers = this.http.post<Handyman[]>(this.ROOT_URL + '/OfferServelt',data,{headers})
      .map(res=>{
       return res;
      })
      .catch(err=>{
        return Observable.of(err);
      })
    }
  }
  getOffersByUser(table,id){
    const data='function=getAllOffersUser&tableName='+table+'&userId='+id;
     const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
     this.offers = this.http.post<Student[]>(this.ROOT_URL + '/OfferServelt',data,{headers})
      .map(res=>{
       return res;
      })
      .catch(err=>{
        return Observable.of(err);
      })
  }
  addUserOffInterests(offerId,category,userId){
    const data='function=addInterests&offerId='+offerId+'&category='+category+'&userId='+userId;
     const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
     this.temp = this.http.post<any>(this.ROOT_URL + '/OfferServelt',data,{headers})
      .subscribe(val=>{
    }) 
  }
 

  
}


