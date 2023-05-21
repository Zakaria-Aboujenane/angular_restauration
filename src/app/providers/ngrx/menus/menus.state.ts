import {Menu} from "../../../components/model/Menu";

export enum MenusStateEnum{
  LOADING="Loading",
  LOADED="Loaded",
  ERROR="Error",
  INITIAL="Initial"
}

export interface MenusState {
  menus:Menu[],
  errorMessage:string,
  dataState:MenusStateEnum,
}

