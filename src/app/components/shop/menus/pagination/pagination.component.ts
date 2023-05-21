import {Component, Input, OnInit} from '@angular/core';
import {PaginationService} from "../../../../providers/design/pagination/pagination.service";
import {Store} from "@ngrx/store";
import {GetAllMenusAction} from "../../../../providers/ngrx/menus/menus.actions";
import {environment} from "../../../../../environments/environment";
import {MenusService} from "../../../../providers/api/menus/menus.service";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  totalPages:number=0;
  currPage:number=1;
  numbersToShow:number[]=[] as Array<number>;
  nextBtnStatus:boolean=true;
  prevBtnStatus:boolean=true;
  constructor(private menusService:MenusService,private pagService:PaginationService,private store:Store<any>) {

  }

  ngOnInit(): void {
    this.numbersToShow = [] as Array<number>;
    this.menusService.getTotalPages().subscribe(value => {
      this.totalPages = value;
      this.pagService.currentPage$.subscribe(cP => {
        this.currPage = cP;
        if(this.currPage>1){
          this.numbersToShow.push(this.currPage-1);
        }
        this.numbersToShow.push(this.currPage);
        if(this.currPage<this.totalPages){
          this.numbersToShow.push(this.currPage+1);
        }
        this.prevBtnStatus = this.currPage -1 >= 1;
        this.nextBtnStatus = (this.currPage+1 <=this.totalPages);
      })
    });
  }
  onGoToPage(event: any,page:number){
    console.log(page);
    this.pagService.setCurrPage(page);
    this.store.dispatch(new GetAllMenusAction(null,page,environment.perPageMenus));
  }

  trackToken(index: number) {
    return index;
  }
}
