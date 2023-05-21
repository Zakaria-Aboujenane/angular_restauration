import { Component } from '@angular/core';
import {ActiveService} from "./providers/design/active/active.service";
import {Title} from "@angular/platform-browser";
import {PaginationService} from "./providers/design/pagination/pagination.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ZedRestau';
  constructor(private activeService:ActiveService,private titleService:Title,private pagService:PaginationService) {

    this.activeService.obs$.subscribe(value => {
      this.pagService.currentPage$.subscribe(value1 => {
        if(value != undefined){
          this.titleService.setTitle(value.toString());
          if(value1 != undefined && value.toString() === "shop"){
            this.titleService.setTitle(value.toString()+" - page : "+value1.toString());
          }
        }

      })


    })
  }
}
