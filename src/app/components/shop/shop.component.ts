import { Component, OnInit } from '@angular/core';
import {ActiveService} from "../../providers/design/active/active.service";
import {Store} from "@ngrx/store";
import {GetAllMenusAction} from "../../providers/ngrx/menus/menus.actions";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  private readonly title:String;
  public  modeAffichage?:String="GRID";
  constructor(private activeService:ActiveService,private store:Store<any>) {
    this.title = "shop";
  }

  ngOnInit(): void {
    this.activeService.setObs(this.title)
    this.store.dispatch(new GetAllMenusAction(null,1,environment.perPageMenus));
  }

  changeViewMode() {
    if(this.modeAffichage==='TABLE')
      this.modeAffichage=`GRID`;
    else
      this.modeAffichage=`TABLE`;
  }

  reload() {
    this.store.dispatch(new GetAllMenusAction(null,1,environment.perPageMenus));
  }
}
