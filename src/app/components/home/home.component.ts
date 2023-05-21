import { Component, OnInit } from '@angular/core';
import {ActiveService} from "../../providers/design/active/active.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private readonly title:String;
  constructor(private activeService:ActiveService) {
    this.title = "home";
  }

  ngOnInit(): void {
    this.activeService.setObs(this.title)
  }
}
