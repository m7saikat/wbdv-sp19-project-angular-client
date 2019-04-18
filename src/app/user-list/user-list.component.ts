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
  constructor(private userService: UserService, private cookieService: CookieService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe((params) => {
      this.userToSearch = params.userName;
    });
  }

  ngOnInit() {
    this.userService.getAllUsers().then((users) => {
      this.allUsers = users;
      this.allUsers.map((user) => {
            console.log(user.username);
            if (user.username.includes(this.userToSearch)
              || (user.firstName && user.firstName.includes(this.userToSearch)) ||
              (user.lastName && user.lastName.includes(this.userToSearch))) {
              this.searchedUsers.push(user);
            }
        });
      });
    }
    goToUser(userId) {
      this.router.navigate(['/search/user/' + userId]);
    }
}
