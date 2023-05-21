import {MenusState, MenusStateEnum} from "./menus.state";
import {Action} from "@ngrx/store";
import {MenusActions, MenusActionsTypes} from "./menus.actions";

const initState:MenusState={
  menus:[],
  errorMessage:"",
  dataState:MenusStateEnum.INITIAL
}
export function MenusReducer(state:MenusState=initState,action:Action):MenusState{
  switch (action.type){
    case MenusActionsTypes.GET_ALL||MenusActionsTypes.SEARCH||MenusActionsTypes.GET_BY_CATEGORIE :
      return {...state,dataState:MenusStateEnum.LOADING};
    case MenusActionsTypes.GET_ALL_SUCCESS||MenusActionsTypes.SEARCH_SUCCESS:
      return {...state,dataState:MenusStateEnum.LOADED,menus:(<MenusActions>action).payload};
    case MenusActionsTypes.GET_ALL_ERROR || MenusActionsTypes.SEARCH_ERROR:
      return {...state,dataState:MenusStateEnum.ERROR,errorMessage:(<MenusActions>action).payload};
    default:
      return {...state};
  }
}
