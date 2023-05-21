import { Injectable } from '@angular/core';
import {User} from "../../components/model/User";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import * as http from "http";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user?:User;
  accessToken:String = "";
  userName:String="zoygberd";
  // @ts-ignore
  authenticated:Subject<boolean>=new BehaviorSubject<boolean>();
  constructor(private http:HttpClient) {
  }
  getCurrUserName():String{
    return this.userName;
  }
  getAccessToken():String{
    return this.accessToken;
  }
  getMessageErrorByCode(err:number):String{
    switch (err) {
      case 498:
        // non authentifie
        return "Veuillez vous authentifier d'abord !";
      case 401:
        // droits d'acces
        return "Vous n'avez pas le droit pour acceder , authentifiez vous";
      case 404:
        // droits d'acces
        return "Vous n'avez pas le droit pour acceder , authentifiez vous";
      default:
        console.log("default error")
        return "erreur inconnue !";
    }
  }
  loginUser(email:String,password:String):Observable<any>{
    return this.http.post(environment.host+"login",{"email":email,"password":password});
  }
  setLoginParams(token:String,username:String){
    console.log("before : "+this.accessToken);
    this.accessToken=token;
    console.log("after : "+this.accessToken);
    this.userName = username;
  }
  get authenticated$(){
    return this.authenticated.asObservable();
  }
  authentify(){
    this.authenticated.next(true);
  }
  disAuthentify(){
    this.authenticated.next(false);
  }
  createAuthorizationHeader(headers: HttpHeaders) {
    headers.set("Authorization", environment.jwtPrefix+this.accessToken.toString());
    console.log("headers in fnct");
    console.log(headers);
  }
}
