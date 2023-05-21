import {Component, OnInit} from '@angular/core';
import {MenusService} from "../../../providers/api/menus/menus.service";
import {Categorie} from "../../model/Categorie";
import {Observable, of, startWith} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {AppDataState, AppStateEum} from "../../model/app-states/app.data.state";
import {Store} from "@ngrx/store";
import {GetMenusByCategorie} from "../../../providers/ngrx/menus/menus.actions";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  cats$?:Observable<AppDataState<Categorie[]>>;
  readonly state = AppStateEum;

  constructor(private menusService:MenusService,private store:Store<any>) {

  }

  ngOnInit(): void {
    this.onGetAll();
  }

  onGetAll(){
    const initState:AppDataState<Categorie[]> = {
      dataState:AppStateEum.LOADING,
    }
    this.cats$ = this.menusService.getCategories().pipe(
      map((categories)=>{
        return {data:categories,dataState:AppStateEum.LOADED};
      }),
      startWith(initState),
      catchError((err)=>of({dataState:AppStateEum.ERROR,error:err.message}))
    );
  }

  getMenusByCat(idCat:number) {
    this.store.dispatch(new GetMenusByCategorie(idCat));
  }
}
