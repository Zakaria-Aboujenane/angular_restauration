import {Menu} from "./Menu";
import {Commande} from "./Commande";

export interface LigneCommande {
  menu:Menu,
  commande:Commande,
  qantite:number
}
