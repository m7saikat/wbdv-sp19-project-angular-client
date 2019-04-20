import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-create-user',
  templateUrl: './admin-create-user.component.html',
  styleUrls: ['./admin-create-user.component.css']
})
export class AdminCreateUserComponent implements OnInit {

  username = '';
  password = '';
  email = '';
  firstName = '';
  lastName = '';
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  onCreateUser(f){
    console.log(f.value);

    const createdUser = {
      "username": f.value.username,
      "password": f.value.password,
      "firstName" : f.value.firstName,
      "lastName": f.value.lastName,
      "email": f.value.email
    };

    this.userService.createUser(createdUser).then((response) => {
      this.router.navigate(['/admin-user-page']);
    });
  }

  redirectToAdminUser(){
    this.router.navigate(['/admin-user-page']);
  }

}
