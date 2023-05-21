import {Categorie} from "./Categorie";

export interface Menu {
  id_menu:number,
  name:String,
  description:String,
  prix:number,
  qteMax:number,
  image:String,
  categorie:Categorie
}
