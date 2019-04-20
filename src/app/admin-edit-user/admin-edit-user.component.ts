import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-admin-edit-user',
  templateUrl: './admin-edit-user.component.html',
  styleUrls: ['./admin-edit-user.component.css']
})
export class AdminEditUserComponent implements OnInit {

  userId;
  username = '';
  email = '';
  firstName = '';
  lastName = '';
  isLoaded = false;
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) {
    this.activatedRoute.params.subscribe((params) => {
      this.userId = params.userId;
    });

    this.userService.getUserById(this.userId).then((response) => {
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

  onUpdateUser(f){
    const updatedUser = {
      "firstName" : f.value.firstName,
      "lastName": f.value.lastName,
      "email": f.value.email
    };

    this.userService.updateUser(this.userId, updatedUser).then((response) => {
      console.log(response);
      this.router.navigate(['/admin-user-page']);
    });
  }

  redirectToAdminUser(){
    this.router.navigate(['/admin-user-page']);
  }

}
