import {Component, Input, OnInit} from '@angular/core';
import {Menu} from "../../../model/Menu";
import {environment} from "../../../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-single-menu',
  templateUrl: './single-menu.component.html',
  styleUrls: ['./single-menu.component.css']
})
export class SingleMenuComponent implements OnInit {
  @Input() menu!:Menu;
  @Input() modeAffichage?:String = "GRID";
  ressHost = environment.ressourcesHost;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }


}
