import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Menu} from "../../../components/model/Menu";
import {environment} from "../../../../environments/environment";
import {Categorie} from "../../../components/model/Categorie";
import {Commande} from "../../../components/model/Commande";
import {UserService} from "../../auth/user.service";

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  constructor(private http: HttpClient, private userSrvice: UserService) {
  }

  getAllMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(environment.host + "menus");
  }

  getMenusPerPage(page?: number, perPage?: number): Observable<Menu[]> {
    let fullLink: String;
    if (page != null && perPage != null) {
      fullLink = `menus_pagination?page=${page}&perPage=${perPage}`;

    } else {
      fullLink = `menus_pagination?page=1&perPage=5`;
    }
    return this.http.get<Menu[]>(environment.host + fullLink)

  }

  getTotalPages(): Observable<number> {
    return this.http.get<number>(environment.host + "total_pages?perPage=" + environment.perPageMenus);
  }

  searchMenus(keyword?: String): Observable<Menu[]> {
    return this.http.get<Menu[]>(environment.host + "search_menus?k=" + keyword);
  }

  getMenusByCategorie(idCat: number): Observable<Menu[]> {
    return this.http.get<Menu[]>(environment.host + "menus_by_cat?cat=" + idCat);
  }

  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(environment.host + "categories");
  }

  getMenuById(id: number): Observable<Menu> {
    return this.http.get<Menu>(environment.host + "menu?id=" + id);
  }

  addMenuToCommande(idMenu: number, idCommande: number, qte: number): Observable<any> {
    console.log("appel a add");
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.userSrvice.accessToken);
    return this.http.post<any>(environment.host + "s/add-menu-to-commande", {
      "idMenu": idMenu,
      "idCommande": idCommande,
      "qte": qte
    }, {
      headers: headers_object
    });
  }
  deleteMenuFromCommande(idMenu: number, idCommande: number): Observable<any> {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.userSrvice.accessToken);
    return this.http.post<any>(environment.host + "s/delete-menu-from-commande", {
      "idMenu": idMenu,
      "idCommande": idCommande,
      "qte": 0
    }, {
      headers: headers_object
    });
  }

  getUserCurrentCommande(username: String): Observable<Commande> {
    if (this.userSrvice.accessToken != "") {
      var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.userSrvice.accessToken);
      return this.http.get<Commande>(environment.host + "s/get-curr-user-commande?u=" + this.userSrvice.userName
        , {
          headers: headers_object
        });
    } else
      return this.http.get<Commande>(environment.host + "s/get-curr-user-commande/" + this.userSrvice.userName);
  }
  commander(idCommande:number){
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.userSrvice.accessToken);
    return this.http.post<any>(environment.host + "s/commander", {
      "idMenu": 0,
      "idCommande": idCommande,
      "qte": 0
    }, {
      headers: headers_object
    });
  }
}
