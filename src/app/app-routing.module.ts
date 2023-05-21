import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ShopComponent} from "./components/shop/shop.component";
import {MenusComponent} from "./components/shop/menus/menus.component";
import {SingleMenuPageComponent} from "./components/shop/menus/single-menu-page/single-menu-page.component";
import {LoginComponent} from "./components/login/login.component";
import {CartComponent} from "./components/shop/cart/cart.component";
const appRoutes: Routes =[
  {path:'home',component:HomeComponent},
  {path:'',component:HomeComponent},
  {path:'shop',component:ShopComponent},
  {path:'menus',component:MenusComponent},
  {path:'single-menu/:menu',component:SingleMenuPageComponent},
  {path:'login/:err',component:LoginComponent},
  {path:'cart',component:CartComponent}

];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
