import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {NgForm} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  username = '';
  email = '';
  firstName = '';
  lastName = '';
  isLoaded = false;
  constructor(private userService: UserService, private cookieService: CookieService) {
    this.userService.getUser().then((response) => {
      console.log(response);
      this.username = response.username;
      this.email = response.email;
      this.firstName = response.firstName;
      this.lastName = response.lastName;
      // this.user = response;
      this.isLoaded = true;
    });
  }

  ngOnInit() {
  }

  onUpdateProfile(f: NgForm){
    const updatedUser = {
      "firstName" : f.value.firstName,
      "lastName": f.value.lastName,
      "email": f.value.email
    };

    this.userService.updateUser(this.cookieService.get("userId"), updatedUser).then((response) => {
      console.log(response);
    });
  }

}
