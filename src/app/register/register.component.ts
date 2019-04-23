import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from '@angular/forms';
import {UserService} from '../services/user.service';
import {CookieService} from 'ngx-cookie-service';
import * as moment from 'moment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isRegisterSuccessful: boolean;
  isRegisterUnsuccessful: boolean;
  errorMsg = '';

  constructor(private userService: UserService, private router: Router, private cookieService: CookieService) {
    this.isRegisterSuccessful = false;
    this.isRegisterUnsuccessful = false;
  }

  ngOnInit() {
  }

  onRegister(f: NgForm){

    this.userService.registerUser({
      username: f.value.username,
      password: f.value.password,
      email: f.value.email
    }).then((response) => {
      if(response.success){
        this.isRegisterSuccessful = true;
        this.userService.setSession(response);

        setTimeout(() => {
          this.isRegisterSuccessful = false;
          if (f.value.username === 'admin' && f.value.password === 'admin'){
            this.router.navigate(['admin-user-page']);
          } else {
            this.router.navigate(['home']);
          }

        }, 1500);

        // this.router.navigate(['home']);
      }else{
        this.isRegisterUnsuccessful = true;
        this.errorMsg = response.message;
        setTimeout(() => {
          this.isRegisterUnsuccessful = false;
        }, 3000);
        console.log("Registration failed");
      }
    })
    // this.router.navigate(['home']);
  }

}
