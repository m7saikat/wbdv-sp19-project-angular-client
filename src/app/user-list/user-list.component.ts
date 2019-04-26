import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  allUsers;
  searchedUsers = [];
  userToSearch;
  currentUser;
  isLoggedIn = false;
  constructor(private userService: UserService, private cookieService: CookieService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe((params) => {
      this.userToSearch = params.userName;
      if(this.cookieService.get("username")){
        this.isLoggedIn = true;
        this.userService.getUser().then((response) => {
          this.currentUser = response;
          console.log(this.currentUser);
        });
      }
      });
  }
  follow = (followerId) => {
      this.userService.follow(followerId).then((response) => {
        this.currentUser.followers.push(followerId);
        console.log(response);
      });
  }
  unfollow = (followerId) => {
    this.userService.unfollow(followerId).then((response) => {
      const index = this.currentUser.followers.indexOf(followerId, 0);
      if (index > -1) {
        this.currentUser.followers.splice(index, 1);
      }
      console.log(response);
    });
  }

  ngOnInit() {
    this.userService.getAllUsers().then((users) => {
      this.allUsers = users;
      this.allUsers.map((user) => {
            if (user.username.includes(this.userToSearch)
              || (user.firstName && user.firstName.includes(this.userToSearch)) ||
              (user.lastName && user.lastName.includes(this.userToSearch))) {
              this.searchedUsers.push(user);
              console.log(this.searchedUsers);
            }
        });
      });
    }
    goToUser(userId) {
      this.router.navigate(['/profile/' + userId]);
    }
}
