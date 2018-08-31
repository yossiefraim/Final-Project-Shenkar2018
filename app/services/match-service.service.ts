import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MatchServiceService {
  private lastItem;
  private matchApplications;
  private matchOffers;
  private manualAppliaction;
  private manualOffer;
  constructor(private http: HttpClient) { }
  private ROOT_URL = 'https://finalproject2018.herokuapp.com';

  createApplicationManualMatch(tableName,userId,applicationId){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    let js = 'function=create&tableName='+tableName+'&userId='+userId+'&applicationId='+applicationId;
     this.http.post(this.ROOT_URL + '/MatchServlet',js,{headers})
     .subscribe(val=>{
     }) 
   }
   createOfferManualMatch(tableName,userId,offerId){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    let js = 'function=create&tableName='+tableName+'&userId='+userId+'&offerId='+offerId;
     this.http.post(this.ROOT_URL + '/MatchServlet',js,{headers})
     .subscribe(val=>{
     }) 
   }
   acceptApplicationManualMatch(fuction,tableName,user,applicationId){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    let js = 'function='+fuction+'&tableName='+tableName+'&user='+user+'&applicationId='+applicationId;
     this.http.post(this.ROOT_URL + '/MatchServlet',js,{headers})
     .subscribe(val=>{
     }) 
   }
   acceptOfferManualMatch(fuction,tableName,user,offerId){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    let js = 'function='+fuction+'&tableName='+tableName+'&user='+user+'&offerId='+offerId;
     this.http.post(this.ROOT_URL + '/MatchServlet',js,{headers})
     .subscribe(val=>{
     }) 
   }
   declineApplicationManualMatch(fuction,tableName,user,applicationId){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    let js = 'function='+fuction+'&tableName='+tableName+'&user='+user+'&applicationId='+applicationId;
     this.http.post(this.ROOT_URL + '/MatchServlet',js,{headers})
     .subscribe(val=>{
     }) 
   }
   declineOfferManualMatch(fuction,tableName,user,offerId){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    let js = 'function='+fuction+'&tableName='+tableName+'&user='+user+'&offerId='+offerId;
     this.http.post(this.ROOT_URL + '/MatchServlet',js,{headers})
     .subscribe(val=>{
     }) 
   }
   deleteApplication(fuction,tableName,applicationId){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    let js = 'function='+fuction+'&tableName='+tableName+'&applicationId='+applicationId;
     this.http.post(this.ROOT_URL + '/ApplicationServelt',js,{headers})
     .subscribe(val=>{
     }) 
   }
   deleteOffer(fuction,tableName,offerId){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    let js = 'function='+fuction+'&tableName='+tableName+'&offerId='+offerId;
     this.http.post(this.ROOT_URL + '/OfferServelt',js,{headers})
     .subscribe(val=>{
     }) 
   }
   setLastItem(element){
    return new Promise((resolve,reject)=>{
      this.lastItem=element;
        resolve();
      });
    
  }
  getLastItem(){
    return this.lastItem;
  }
  setMatchApplication(app){
    this.matchApplications=app;
  }
  getMatchApplication(){
    return this.matchApplications;
  }
  setMatchOffer(off){
    this.matchOffers=off;
  }
  getMatchOffer(){
    return this.matchOffers;
  }
  setManualOffer(off){
    this.manualOffer=off;
  }
  getManualOffer(){
    return this.manualOffer;
  }
  setManualApplication(app){
    this.manualAppliaction=app;
  }
  getManualApplication(){
    return this.manualAppliaction;
  }
  

}
