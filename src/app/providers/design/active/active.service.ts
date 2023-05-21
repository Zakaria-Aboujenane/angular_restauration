import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ActiveService {
  constructor() {

  }
   // @ts-ignore
  private obs:Subject<String> = new BehaviorSubject<String>();
  // @ts-ignore
  private pageToGO:Subject<String> = new BehaviorSubject<String>();

  get obs$(){
    return this.obs.asObservable();
  }
  setObs(value:String){
    this.obs.next(value);
  }

  get pageToGO$(){
    return this.pageToGO.asObservable();
  }
  setpageToGO(v:String){
    this.pageToGO.next(v);
  }
}
