import { Injectable } from '@angular/core';
import {MenusService} from "../../api/menus/menus.service";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  // @ts-ignore
  totalPages:Subject<number> = new BehaviorSubject<number>();

  // @ts-ignore
  currentPage:Subject<number> = new BehaviorSubject<number>();

  constructor(private menusService:MenusService) {
    this.currentPage.next(1);
    menusService.getTotalPages().subscribe(value => {
      this.totalPages.next(value);
    });
  }
  get totalPages$(){
    return this.totalPages.asObservable();
  }
  get currentPage$(){
    return this.currentPage.asObservable();
  }
  setCurrPage(value:number){
    this.currentPage.next(value);
  }
}
