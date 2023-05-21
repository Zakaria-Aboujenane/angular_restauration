export interface AppDataState<T>{
  data?:T,
  error?:string,
  dataState:AppStateEum
}
export enum AppStateEum {
  LOADING,
  LOADED,
  ERROR
}
