import {Action} from "@ngrx/store";

export enum MenusActionsTypes{
  GET_ALL="[Menus] All",
  GET_ALL_SUCCESS="[Menus] All_Success",
  GET_ALL_ERROR="[Menus] All_Error",

  SEARCH="[Menus] SEARCH",
  SEARCH_SUCCESS="[Menus] SEARCH_Success",
  SEARCH_ERROR="[Menus] SEARCH_Error",
  GET_BY_CATEGORIE = "[Menus] Get_BY_CATEGORIE"
}

export class GetAllMenusAction implements Action{
  type:MenusActionsTypes = MenusActionsTypes.GET_ALL;

  constructor(public payload?:any,public page?:number,public perPage?:number) {
  }
}
export class GetAllMenusActionSUCESS implements Action{
  type:MenusActionsTypes = MenusActionsTypes.GET_ALL_SUCCESS;
  constructor(public payload?:any) {
  }
}
export class GetAllMenusActionERROR implements Action{
  type:MenusActionsTypes = MenusActionsTypes.GET_ALL_ERROR;
  constructor(public payload?:any) {
  }
}
// actions de search

export class SearchMenusAction implements Action{
  type:MenusActionsTypes = MenusActionsTypes.SEARCH;
  constructor(public payload?:any,public k?:string) {
  }
}
export class GetMenusByCategorie implements Action{
  type: MenusActionsTypes = MenusActionsTypes.GET_BY_CATEGORIE;

  constructor(public payload?:any) {
  }


}
export type MenusActions = GetAllMenusAction|GetAllMenusActionSUCESS|GetAllMenusActionERROR|GetMenusByCategorie|SearchMenusAction
