import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from '@angular/forms';
import {UserService} from '../services/user.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginSuccessful: boolean;
  isLoginUnsuccessful: boolean;
  errorMsg = '';

  constructor(private userService: UserService, private router: Router, private cookieService: CookieService) {
    this.isLoginSuccessful = false;
    this.isLoginUnsuccessful = false;
  }

  ngOnInit() {
  }

  onLogin(f: NgForm){

    this.userService.loginUser({
      username: f.value.username,
      password: f.value.password
    }).then((response) => {
      if(response.success){
        this.isLoginSuccessful = true;
        this.cookieService.set("token", response.token);
        this.cookieService.set("username", response.user.user.username);
        this.cookieService.set("userId", response.user.user._id);
        setTimeout(() => {
          this.isLoginSuccessful = false;
          this.router.navigate(['home']);
        }, 1200);

        // this.router.navigate(['home']);
      }else{
        this.isLoginUnsuccessful = true;
        this.errorMsg = response.message;
        setTimeout(() => {
          this.isLoginUnsuccessful = false;
        }, 3000);
      }
    });
  }

}
