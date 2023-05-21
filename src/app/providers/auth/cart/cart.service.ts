import { Injectable } from '@angular/core';
import {LigneCommande} from "../../../components/model/LigneCommande";
import {BehaviorSubject, Observable, Subject, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {UserService} from "../user.service";
import {MenusService} from "../../api/menus/menus.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // @ts-ignore
  items:Subject<number>=new BehaviorSubject<number>();

  constructor(private http:HttpClient,private userService:UserService,menuService:MenusService) {
    userService.authenticated$.subscribe(auth=>{
      if(auth){
        menuService.getUserCurrentCommande(this.userService.userName).subscribe(com=>{
          this.getLignesForCommande(com.id_commande).subscribe(lignes=>{
            this.items.next(lignes.length);
          })
        })

      }
    })
  }
  getLignesForCommande(idc:number):Observable<LigneCommande[]>{
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.userService.accessToken);
    return this.http.get<LigneCommande[]>(environment.host + "s/get-lignes-for-commande?idc=" + idc,{
      headers:headers_object
    });
  }

  setItems(v:number){
    this.items.next(v);
  }
  get items$(){
    return this.items.asObservable();
  }
}
