import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { CategoriesComponent } from './components/shop/categories/categories.component';
import { MenusComponent } from './components/shop/menus/menus.component';
import { SearchComponent } from './components/shop/search/search.component';
import { SingleMenuComponent } from './components/shop/menus/single-menu/single-menu.component';
import {StoreModule} from "@ngrx/store";
import {MenusReducer} from "./providers/ngrx/menus/menus.reducers";
import {EffectsModule} from "@ngrx/effects";
import {MenusEffects} from "./providers/ngrx/menus/menus.effects";
import {StoreDevtools, StoreDevtoolsModule} from "@ngrx/store-devtools";
import {HttpClientModule} from "@angular/common/http";
import {PaginationComponent} from "./components/shop/menus/pagination/pagination.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SingleMenuPageComponent } from './components/shop/menus/single-menu-page/single-menu-page.component';
import { LoginComponent} from "./components/login/login.component";
import {CartComponent} from "./components/shop/cart/cart.component";



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    ShopComponent,
    CategoriesComponent,
    MenusComponent,
    SearchComponent,
    SingleMenuComponent,
    PaginationComponent,
    PaginationComponent,
    SingleMenuPageComponent,
    LoginComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({menusState: MenusReducer}),
    EffectsModule.forRoot([MenusEffects]),
    StoreDevtoolsModule.instrument(),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
