import { Component, OnInit } from '@angular/core';
import {CartService} from "../../../providers/auth/cart/cart.service";
import {MenusService} from "../../../providers/api/menus/menus.service";
import {LigneCommande} from "../../model/LigneCommande";
import {UserService} from "../../../providers/auth/user.service";
import {environment} from "../../../../environments/environment";
import {Commande} from "../../model/Commande";
import {Menu} from "../../model/Menu";
import {Router} from "@angular/router";
import {ActiveService} from "../../../providers/design/active/active.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  lignes:LigneCommande[]=[] ;
  imagePath:String=environment.ressourcesHost;
  error:String="";

  constructor(private activeService:ActiveService,private router:Router,private cartService:CartService,private menusService:MenusService,private userService:UserService) { }

  ngOnInit(): void {
    this.activeService.setObs("my cart")
    this.initLignes();
  }
  initLignes(){
    this.menusService.getUserCurrentCommande(this.userService.userName).subscribe(currCommand=>{
      this.cartService.getLignesForCommande(currCommand.id_commande).subscribe(lignesDeCommande=>{
        console.log(lignesDeCommande);
        this.lignes=lignesDeCommande;
        console.log("length : "+lignesDeCommande.length);
        this.cartService.setItems(this.lignes.length);
      })
    });
  }

  getTotalMenus():number {
    if(this.lignes.length>0){
      return this.lignes.map(v=>{
        return v.menu.prix*v.qantite
      }).reduce((p,c)=>{
        return p+c;
      });
    }else{
      return 0;
    }

  }

  inc(l: LigneCommande) {
    if((l.qantite+1)<=l.menu.qteMax) {
      l.qantite++;
      this.menusService.addMenuToCommande(l.menu.id_menu,l.commande.id_commande,1).subscribe(v=>{
      });
    }

  }

  dec(l: LigneCommande) {
    if((l.qantite-1)>=0) {
      l.qantite--;
      this.menusService.addMenuToCommande(l.menu.id_menu,l.commande.id_commande,-1).subscribe(v=>{
      })
    }
  }

  deleteLigne(l: LigneCommande) {
    this.menusService.deleteMenuFromCommande(l.menu.id_menu,l.commande.id_commande).subscribe(v=>{
      this.initLignes();

    });
  }

  commander() {
    this.menusService.commander(this.lignes[0].commande.id_commande).subscribe(v=>{
      console.log("commande effecute");
      this.initLignes();
      this.router.navigate(["home"]);
    });
  }
}
