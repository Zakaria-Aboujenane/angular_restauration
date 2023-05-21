import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Menu} from "../../../model/Menu";
import {MenusService} from "../../../../providers/api/menus/menus.service";
import {environment} from "../../../../../environments/environment";
import {ActiveService} from "../../../../providers/design/active/active.service";
import {UserService} from "../../../../providers/auth/user.service";
import {Commande} from "../../../model/Commande";
import {CartService} from "../../../../providers/auth/cart/cart.service";
@Component({
  selector: 'app-single-menu-page',
  templateUrl: './single-menu-page.component.html',
  styleUrls: ['./single-menu-page.component.css']
})
export class SingleMenuPageComponent implements OnInit {
  @Input() menu!:Menu;
  srcimg:string = "/assets/img/zerda-logo.png";
  title:String = "Menu";
  qteChoisie:number=1;

  constructor(private cartService:CartService,private userService:UserService,private router:Router,private route:ActivatedRoute,private menusService:MenusService,private activeService:ActiveService) { }

  ngOnInit(): void {
    this.menu = {id_menu:1,name:"test",qteMax:0,categorie:{id_categorie:0,name:""},description:"",prix:30.00,image:""};
    this.route.params.subscribe((params: Params) => {
      const id:number = Number(params['menu']);
      this.menusService.getMenuById(id).subscribe(m=>{
        this.menu=m;
        this.title = "Menu : "+this.menu.name+" - "+this.menu.categorie.name;
        this.activeService.setObs(this.title);
        this.srcimg = environment.ressourcesHost+this.menu.image;
      });

    });

    this.activeService.setObs(this.title.toString());
  }

  onBuy(menu: Menu) {
      this.menusService.getUserCurrentCommande(this.userService.getCurrUserName()).subscribe(com => {
        this.menusService.addMenuToCommande(this.menu.id_menu,com.id_commande,this.qteChoisie).subscribe(
          value=>{
            this.cartService.getLignesForCommande(com.id_commande).subscribe(lignes=>{
              this.cartService.setItems(lignes.length);
              this.menu.qteMax -= this.qteChoisie;
              this.qteChoisie=1;
            });
          },error=>{
            console.log("error to set up !");
            console.log(error);
          }
        )
      },error => {
        if(error.status === 498 || error.status===404){
          console.log( error.status===498? "Invalid JWT Token !":"JWT Token Not Found !");
          this.activeService.setpageToGO("single-menu/"+menu.id_menu);
          this.router.navigate(["login/"+error.status]);

        }
      });



  }

  incQteChoisie() {
    if(this.qteChoisie<this.menu.qteMax){
      this.qteChoisie++;
    }

  }

  decQteChoisie() {
    if(this.qteChoisie -1>0){
      this.qteChoisie--;
    }


  }
}
