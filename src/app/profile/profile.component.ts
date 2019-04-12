import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  username = '';
  constructor(private userService: UserService) {
    this.userService.getUser(123).then((response) => {
      console.log(response);
      this.user = response;
    });
  }

  ngOnInit() {
  }

}
