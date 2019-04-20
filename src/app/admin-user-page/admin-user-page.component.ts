import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-user-page.component.html',
  styleUrls: ['./admin-user-page.component.css']
})
export class AdminUserPageComponent implements OnInit {

  users = [];
  constructor(private userService: UserService, private router: Router) {
    this.userService.getAllUsers().then((response) => {
      console.log(response);
      this.users = response;
    });
  }

  ngOnInit() {
  }

  deleteUser(userId){
    this.userService.deleteUser(userId).then((res) => {
      this.userService.getAllUsers().then((response) => {
        this.users = response;
      });
    });
  }

  editUser(userId){
    this.router.navigate(['/admin/edit-user', userId]);
  }

  createUser(){
    this.router.navigate(['/admin/create-user']);
  }

}
