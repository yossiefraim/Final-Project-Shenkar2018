import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../services/post';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { resolve, reject } from 'q';

@Injectable()
export class UserLoginService {

  private userInfo = {
    firstName:"",
    lastName:"",
    age:"",
    kids:"",
    familyStatus:"",
    userId:""
  }
  private userContact = {
    phone:"",
    email:"",
    city:"",
    street:"",
    houseNumber:""
  }
  private userInterest={
    ride:false,
    elderly:false,
    handyman:false,
    student:false,
  }
  private userPass;
  private isUserLoggedIn;
  public username = "כניסה לחשבון";
  public userApplications;
  public userOffers;
  public updateCity;
  public updateAddress;
  public updateHouseNumber;
  readonly ROOT_URL = 'https://finalproject2018.herokuapp.com';
  newPost:any;
  appMatchUsers:any[]=[];
  offerMatchUsers:any[]=[];
  private SERVER_URL = "ws://finalproject2018.herokuapp.com/endpoint";
  private userMatchOffers;
  private userMatchApplications;
  private itemUser;
  private userAppMatchContact:any[]=[];
  private userOffMatchContact:any[]=[];
  private UserAdreessUpdateLocation;
  

  constructor(private http: HttpClient) { 
    this.isUserLoggedIn = false;    
  }
  setUserLoggedIn(){
    this.isUserLoggedIn = true;
  }
  setUserLoggedOff(){
    this.isUserLoggedIn = false;
  }
  getUserLoggedIn(){
    return this.isUserLoggedIn;
  }
  getUserName(){
    return this.username;
  }
  setUserName(name){
    this.username=name;
  }
  setUserPass(pass){
    this.userPass=pass;
  }
  getUserPass(){
    return this.userPass;
  }
  setUserInfo(firstName,lastName,age,kids,familyStatus,userId){
    this.userInfo.firstName = firstName;
    this.userInfo.lastName = lastName;
    this.userInfo.age = age;
    this.userInfo.kids = kids;
    this.userInfo.familyStatus = familyStatus;
    this.userInfo.userId = userId;
  }
  getUserInfo(){
    return this.userInfo;
  }

  getUserId(){
    return this.userInfo.userId;
  }
  setUserInterest(elderly,student,ride,handyman){
    this.userInterest.student=student;
    this.userInterest.elderly=elderly;
    this.userInterest.ride=ride;
    this.userInterest.handyman=handyman;
  }
  setUserContact(email,phone,city,street,houseNumber){
    this.userContact.phone=phone;
    this.userContact.email=email;
    this.userContact.city=city;
    this.userContact.street=street;
    this.userContact.houseNumber=houseNumber;
  }
  getUserContact(){
    return this.userContact;
  }
  getUserInterest(){
    return this.userInterest;
  }
  updateName(firsName,lastName){
    this.username =firsName+' '+lastName;
  }

  login(mail,pass){
      const data='function=getUser&mail='+mail+'&password='+pass;
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      this.newPost = this.http.post<Post[]>(this.ROOT_URL + '/UserLoginServelt',data,{headers})
      .map(res=>{
       return res;
      })
      .catch(err=>{
        return Observable.of(err);
      })
    }

    createUser(firstname,lastname,mail,password,phone,age,familyStatus,kids,city,street,houseNumber,latitude,longitude,interests){
      const data='function=create&firstName='+firstname+'&lastName='+lastname+'&mail='+mail+'&password='+password+'&phone='+phone+'&age='+age+'&familyStatus='+familyStatus+'&kids='+kids+'&student='+interests.student+'&olders='+interests.elderly+'&handyman='+interests.handyman+'&ride='+interests.ride+'&city='+city+'&street='+street+'&houseNumber='+houseNumber+'&latitude='+latitude+'&longitude='+longitude;
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
      this.http.post(this.ROOT_URL + '/UserLoginServelt',data,{headers})
      .subscribe(val=>{
      }) 
    }
    updateUser(firstname,lastname,mail,password,phone,age,familyStatus,kids,city,street,houseNumber,latitude,longitude,interests){
      const data='function=update&firstName='+firstname+'&lastName='+lastname+'&mail='+mail+'&password='+password+'&phone='+phone+'&age='+age+'&familyStatus='+familyStatus+'&kids='+kids+'&student='+interests.student+'&olders='+interests.elderly+'&handyman='+interests.handyman+'&ride='+interests.ride+'&city='+city+'&street='+street+'&houseNumber='+houseNumber+'&latitude='+latitude+'&longitude='+longitude;
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
      this.http.post(this.ROOT_URL + '/UserLoginServelt',data,{headers})
      .subscribe(val=>{
        console.log("update result "+val);
      }) 
    }
    deleteUser(mail,password,){
      const data='function=delete&mail='+mail+'&password='+password;
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      this.http.post(this.ROOT_URL + '/UserLoginServelt',data,{headers})
      .subscribe(val=>{
      }) 
    }
    getAppMatchUserById(userId){
      const data='function=getUserInfo&userId='+userId;
     const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      this.http.post<Post>(this.ROOT_URL + '/UserLoginServelt',data,{headers})
      .subscribe(val=>{
        this.setAppUserMatchById(val);
      })
    }
    getOffMatchUserById(userId){
    const data='function=getUserInfo&userId='+userId;
     const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      this.http.post<Post>(this.ROOT_URL + '/UserLoginServelt',data,{headers})
      .subscribe(val=>{
        this.setOffUserMatchById(val);
      })
    }
    getUserById(userId){
      return new Promise((resolve,reject)=>{
        const data='function=getUserInfo&userId='+userId;
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post<Post>(this.ROOT_URL + '/UserLoginServelt',data,{headers})
        .subscribe(val=>{
          this.setItemUserById(val);
          resolve(val);
        });
      });
    }
     getUserApplication(id,category){
      return new Promise((resolve,reject)=>{
        const data='function=getUserToInform&applicationId='+id+'&category='+category;
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post<any>(this.ROOT_URL + '/ApplicationServelt',data,{headers})
        .subscribe(val=>{
          resolve(val);
        });
      });
    }
    getUserOffer(id,category){
      return new Promise((resolve,reject)=>{
        const data='function=getUserToInform&offerId='+id+'&category='+category;
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post<any>(this.ROOT_URL + '/OfferServelt',data,{headers})
        .subscribe(val=>{
          resolve(val);
        });
      });
    }
     updateUserLocationByMaps(userId,city,street,houseNumber,latitude,longitude){
      const data='function=updateUserLocation&userId='+userId+'&city='+city+'&street='+street+'&houseNumber='+houseNumber+'&latitude='+latitude+'&longitude='+longitude;
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
       this.http.post<Post>(this.ROOT_URL + '/UserLoginServelt',data,{headers})
       .subscribe(val=>{
       })
     }
     getUserCoordinatesLoctionByMaps(adress){
       return new Promise((resolve,reject)=>{
        const data='https://maps.googleapis.com/maps/api/geocode/json?address='+adress+'&key=AIzaSyCkBNC2qUuPFhzixy4d12wWymV7vFuhG5Y';
        this.http.get<any>(data)
        .subscribe(val=>{
          resolve(val);
       })
       })
   }
   getUserAddressLoctionByMaps(coordinates){
    return new Promise((resolve,reject)=>{
     const data='https://maps.googleapis.com/maps/api/geocode/json?language=iw&latlng='+coordinates+'&key=AIzaSyCkBNC2qUuPFhzixy4d12wWymV7vFuhG5Y';
     this.http.get<any>(data)
     .subscribe(val=>{
       this.setUserAdreessUpdateLocation(val);
       resolve(val);
    })
    })
}
    setUserAdreessUpdateLocation(address){
      this.UserAdreessUpdateLocation=address;
    }
    getUserAdreessUpdateLocation(){
      return this.UserAdreessUpdateLocation;
    }
    setAppUserMatchById(post){
      this.appMatchUsers.push(post);
    }
    getAppUserMatchById(){
      return this.appMatchUsers;
    }
    setOffUserMatchById(post){
      this.offerMatchUsers.push(post);
    }
    getOffUserMatchById(){
      return this.offerMatchUsers;
    }
    setItemUserById(post){
      this.itemUser=post;
    }
    setUserApplications(applications){
      this.userApplications=applications;
    }
    setUserOffers(offers){
      this.userOffers=offers;
    }
    getItemUser(){
      return this.itemUser;
    }
    getUserApplications(){
      return this.userApplications;
    }
    getUserOffers(){
      return this.userOffers;
    }
    setUserMatchApplications(match){
      this.userMatchApplications=match;
    }
    getUserMatchApplications(){
      return this.userMatchApplications;
    }
    setUserMatchOffer(match){
      this.userMatchOffers=match;
    }
    getUserMatchOffers(){
      return this.userMatchOffers;
    }
    
}
