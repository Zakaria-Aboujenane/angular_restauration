import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserService} from "../../providers/auth/user.service";
import {ActiveService} from "../../providers/design/active/active.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage?:String;
  nextPageToGo:String="home";
  loginFormGroup!:FormGroup;
  submitted:boolean=false;


  constructor(private fb:FormBuilder,private router:Router,private route:ActivatedRoute,private userService:UserService,private activeService:ActiveService) { }

  ngOnInit(): void {
    this.activeService.setObs("Login Page")
    this.loginFormGroup = this.fb.group({
      email:[null,Validators.required],
      password:[null,Validators.required],
    });
    this.route.params.subscribe((params: Params) => {
      if(params['err'] != null && params['err'] != undefined){
        const err: number = Number(params['err']);
        if(err==1){
          this.errorMessage=undefined;
        }else{
          this.errorMessage= this.userService.getMessageErrorByCode(err);
        }

      }else{
        this.errorMessage="";
      }
    });
    this.activeService.pageToGO$.subscribe(value => {
      if(value!=undefined){
        this.nextPageToGo=value;
      }

    });


  }

  goLogin() {
    this.submitted = true;
    // @ts-ignore
    this.errorMessage = null;
    this.userService.loginUser(this.loginFormGroup.controls['email'].value, this.loginFormGroup.controls['password'].value).subscribe(v => {
      this.userService.setLoginParams( v['access-token'], v['username']);
      this.userService.authentify();
      this.router.navigate([this.nextPageToGo.toString()])
    }, error => {
      this.errorMessage = "Email or password are invalid";
    });
  }
}
