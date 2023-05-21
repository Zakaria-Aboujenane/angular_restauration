import {Component, CUSTOM_ELEMENTS_SCHEMA, Input, NO_ERRORS_SCHEMA, OnInit} from '@angular/core';
import {ActiveService} from "../../../providers/design/active/active.service";
import {MenusState, MenusStateEnum} from "../../../providers/ngrx/menus/menus.state";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css'],
})
export class MenusComponent implements OnInit {
  menusState$?:Observable<MenusState>;
  @Input() modeAffichage?:String = "GRID";
  readonly DataStateEnum = MenusStateEnum;


  constructor(private activeService:ActiveService,private store:Store<any>) {
  }

  ngOnInit(): void {
    this.menusState$= this.store.pipe(
      map((state)=> {
        return state.menusState;
      })
    );
  }
  trackToken(index: number) {
    return index;
  }

}
