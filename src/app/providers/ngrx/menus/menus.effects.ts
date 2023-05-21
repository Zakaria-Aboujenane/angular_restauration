
import {Observable, of} from "rxjs";
import {Action} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  GetAllMenusAction,
  GetAllMenusActionERROR,
  GetAllMenusActionSUCESS, GetMenusByCategorie,
  MenusActionsTypes,
  SearchMenusAction
} from "./menus.actions";
import {MenusService} from "../../api/menus/menus.service";
import {Injectable} from "@angular/core";
import {catchError, map, mergeMap} from "rxjs/operators";

@Injectable()
export class MenusEffects {
  constructor(private menusService: MenusService, private effectActions: Actions) {
  }
  getAllMenusEffect:Observable<Action> = createEffect(
    ()=>this.effectActions.pipe(
      ofType<GetAllMenusAction>(MenusActionsTypes.GET_ALL),
      mergeMap((action)=>{
        return this.menusService.getMenusPerPage(action.page,action.perPage).pipe(
          map((menus)=>new GetAllMenusActionSUCESS(menus)),
          catchError((err)=>of(new GetAllMenusActionERROR(err.message)))
        );
      }),
    )
  )
  searchMenusEffect:Observable<Action> = createEffect(
    ()=>this.effectActions.pipe(
      ofType<SearchMenusAction>(MenusActionsTypes.SEARCH),
      mergeMap((action)=>{
        return this.menusService.searchMenus(action.k).pipe(
          map((ms)=>new GetAllMenusActionSUCESS(ms)),
          catchError((err)=>of(new GetAllMenusActionERROR(err.message)))
        );
      })
    )
  )
  getMenusByCat:Observable<Action> = createEffect(
    ()=>this.effectActions.pipe(
      ofType<GetMenusByCategorie>(MenusActionsTypes.GET_BY_CATEGORIE),
      mergeMap((action)=>{
        return this.menusService.getMenusByCategorie(action.payload).pipe(
          map((ms)=>new GetAllMenusActionSUCESS(ms)),
          catchError((err)=>of(new GetAllMenusActionERROR(err.message)))
        );
      })
    )
  )
}
