import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {UserService} from '../services/user.service';
import {CookieService} from 'ngx-cookie-service';
import { SocialUser } from 'angularx-social-login';
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

  signInWithGoogle(): void {
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res => {
    //   this.userService.getUserfromSocial(res.email).then(user=>
    //   this.userService.loginUser(user)
    //     .then(resp => console.log(resp)));
    // });
    window.open('https://accounts.google.com/o/oauth2/auth?scope=email&response_type=code&access_type=offline&redirect_uri=http://localhost:4000/login/google&client_id=950601830079-k48proe2ml618ce918k5it6uo15ib0dq.apps.googleusercontent.com','_self') ;
  }


  ngOnInit() {
  }

  onLogin(f: NgForm) {

    this.userService.loginUser({
      username: f.value.username,
      password: f.value.password
    }).then((response) => {
      if (response.success) {

        this.userService.setSession(response);
        this.isLoginSuccessful = true;

        setTimeout(() => {
          this.isLoginSuccessful = false;
          this.router.navigate(['home']);
        }, 1200);

        // this.router.navigate(['home']);
      } else {
        this.isLoginUnsuccessful = true;
        this.errorMsg = response.message;
        setTimeout(() => {
          this.isLoginUnsuccessful = false;
        }, 3000);
      }
    });
  }
}
