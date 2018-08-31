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
export class ApplicationService {

  private ROOT_URL = 'https://finalproject2018.herokuapp.com';
  applications:any;
  olderApps:any;
  rideApps:any;
  studentApps:any;
  handymanApps:any;
  olderAppsHomepage:any;
  rideAppsHomepage:any;
  studentAppsHomepage:any;
  handymanAppsHomepage:any;
  suggestionsApplication:any;
  temp:any;
  private randomApp;
  public userMatchContact:any[]=[];
 
  
  constructor(private http: HttpClient) { }

  createOldersApplication(data){
     
   const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
   let js = 'function=create&application='+JSON.stringify(data)+'&tableName=olders';
    this.http.post(this.ROOT_URL + '/ApplicationServelt',js,{headers})
    .subscribe(val=>{
    }) 
  }

  createHandymanApplication(data){
   const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
   let js = 'function=create&application='+JSON.stringify(data)+'&tableName=handyman';
    this.http.post(this.ROOT_URL + '/ApplicationServelt',js,{headers})
    .subscribe(val=>{
    }) 
  }

  createStudentApplication(data){
   const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
   let js = 'function=create&application='+JSON.stringify(data)+'&tableName=student';
    this.http.post(this.ROOT_URL + '/ApplicationServelt',js,{headers})
    .subscribe(val=>{
    }) 
  }

  createRideApplication(data){
   const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
   let js = 'function=create&application='+JSON.stringify(data)+'&tableName=ride';
    this.http.post(this.ROOT_URL + '/ApplicationServelt',js,{headers})
    .subscribe(val=>{
    }) 
  }

  getApplicationById(table,id){
    const data='function=getApplication&tableName='+table+'&applicationId='+id;
     const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
   
     if(table=='student'){
      this.applications = this.http.post<Student[]>(this.ROOT_URL + '/ApplicationServelt',data,{headers})
      .map(res=>{
       return res;
      })
      .catch(err=>{
        return Observable.of(err);
      })
    }else if(table=='ride'){
      this.applications = this.http.post<Ride[]>(this.ROOT_URL + '/ApplicationServelt',data,{headers})
      .map(res=>{
       return res;
      })
      .catch(err=>{
        return Observable.of(err);
      })
    }else if(table=='olders'){
      this.applications = this.http.post<Olders[]>(this.ROOT_URL + '/ApplicationServelt',data,{headers})
      .map(res=>{
       return res;
      })
      .catch(err=>{
        return Observable.of(err);
      })
    }else if (table=='handyman'){
      this.applications = this.http.post<Handyman[]>(this.ROOT_URL + '/ApplicationServelt',data,{headers})
      .map(res=>{
       return res;
      })
      .catch(err=>{
        return Observable.of(err);
      })
    }
  }

  deleteApplications(table,id){
    const data='function=delete&tableName='+table+'&applicationId='+id;
     const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
     this.http.post(this.ROOT_URL + '/ApplicationServelt',data,{headers})
      .subscribe(val=>{
    }) 
  }
  getRandomApplicationsHomepage(table,number){
    const data='function=randomApplications&tableName='+table+'&number='+number;
     const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
 
     if(table=='student'){
      this.studentAppsHomepage = this.http.post<Student[]>(this.ROOT_URL + '/ApplicationServelt',data,{headers})
      .map(res=>{
       return res;
      })
      .catch(err=>{
        return Observable.of(err);
      })
    }else if(table=='ride'){
      this.rideAppsHomepage = this.http.post<Ride[]>(this.ROOT_URL + '/ApplicationServelt',data,{headers})
      .map(res=>{
       return res;
      })
      .catch(err=>{
        return Observable.of(err);
      })
    }else if(table=='olders'){
      this.olderAppsHomepage = this.http.post<Olders[]>(this.ROOT_URL + '/ApplicationServelt',data,{headers})
      .map(res=>{
       return res;
      })
      .catch(err=>{
        return Observable.of(err);
      })
    }else if (table=='handyman'){
      this.handymanAppsHomepage = this.http.post<Handyman[]>(this.ROOT_URL + '/ApplicationServelt',data,{headers})
      .map(res=>{
       return res;
      })
      .catch(err=>{
        return Observable.of(err);
      })
    }
  }
  getRandomApplications(table,number,userId){
    const data='function=randomApplications&tableName='+table+'&number='+number+'&userId='+userId;
     const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
 
     if(table=='student'){
      this.studentApps = this.http.post<Student[]>(this.ROOT_URL + '/ApplicationServelt',data,{headers})
      .map(res=>{
       return res;
      })
      .catch(err=>{
        return Observable.of(err);
      })
    }else if(table=='ride'){
      this.rideApps = this.http.post<Ride[]>(this.ROOT_URL + '/ApplicationServelt',data,{headers})
      .map(res=>{
       return res;
      })
      .catch(err=>{
        return Observable.of(err);
      })
    }else if(table=='olders'){
      this.olderApps = this.http.post<Olders[]>(this.ROOT_URL + '/ApplicationServelt',data,{headers})
      .map(res=>{
       return res;
      })
      .catch(err=>{
        return Observable.of(err);
      })
    }else if (table=='handyman'){
      this.handymanApps = this.http.post<Handyman[]>(this.ROOT_URL + '/ApplicationServelt',data,{headers})
      .map(res=>{
       return res;
      })
      .catch(err=>{
        return Observable.of(err);
      })
    }
  }
  getSuggestionsApplication(userId){
    const data='function=suggestions&userId='+userId;
     const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
     this.suggestionsApplication = this.http.post<any[]>(this.ROOT_URL + '/ApplicationServelt',data,{headers})
      .map(res=>{
       return res;
      })
      .catch(err=>{
        return Observable.of(err);
      })
  }
  getApplicationsByUser(id){
    const data='function=getAllApplicationsUser&userId='+id;
     const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
     this.applications = this.http.post<any[]>(this.ROOT_URL + '/ApplicationServelt',data,{headers})
      .map(res=>{
       return res;
      })
      .catch(err=>{
        return Observable.of(err);
      })
  }
  addUserAppInterests(applicationId,category,userId){
    const data='function=addInterests&applicationId='+applicationId+'&category='+category+'&userId='+userId;
     const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
     this.temp = this.http.post<any>(this.ROOT_URL + '/ApplicationServelt',data,{headers})
      .subscribe(val=>{
    }) 
  }
  
}


