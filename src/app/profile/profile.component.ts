import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {NgForm} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {GiphyService} from '../services/giphy.service';
import {GifService} from '../services/gif.service';

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
  userLikes: any[] = [];
  hasLikes: boolean;
  uploads: any[];
  constructor(private userService: UserService, private cookieService: CookieService, private giphyService: GiphyService, private gifService: GifService) {
    this.userService.getUser().then((response) => {
      console.log(response);
      this.username = response.username;
      this.email = response.email;
      this.firstName = response.firstName;
      this.lastName = response.lastName;
      // this.user = response;
      this.isLoaded = true;

      if (response.likes.length === 0) {
        this.hasLikes = false;
      } else {
        this.hasLikes = true;
        response.likes.map((like) => {
          this.giphyService.getGifById(like).then((gif) => {
            this.userLikes.push(gif.data.images.fixed_height.url);
          });
        });
      }
    });
    this.gifService.getUploads().then((res) => {
      this.uploads = res;
      console.log(this.uploads);
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
