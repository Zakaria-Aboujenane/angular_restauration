import { Component, OnInit } from '@angular/core';
import {ActiveService} from "../../providers/design/active/active.service";
import {Store} from "@ngrx/store";
import {MenusActionsTypes, SearchMenusAction} from "../../providers/ngrx/menus/menus.actions";
import {UserService} from "../../providers/auth/user.service";
import {CartService} from "../../providers/auth/cart/cart.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  currPage?:String;
  keyword?: string;
  auth:boolean=false;
  cartItems:number=0;
  constructor(private cartService:CartService,private activeService:ActiveService,private userService:UserService,private store:Store<any>) { }

  ngOnInit(): void {
    this.activeService.obs$.subscribe(value => {
      if(value != undefined){
        this.currPage = value;
      }
    });
    this.userService.authenticated$.subscribe(status=>{
      if(status!= undefined){
        this.auth=status;
      }
    });
    this.cartService.items$.subscribe(v=>{
      console.log(v);
      this.cartItems=v;
    });

  }

  searchMenu() {
    console.log(this.keyword);
    if(this.keyword != undefined && this.keyword!="")
      this.store.dispatch(new SearchMenusAction(null,this.keyword))
    else alert("veuillez taper quelque chose a rechercher");
  }
}
