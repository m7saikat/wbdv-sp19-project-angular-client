import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from '../services/user.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  cookieValue = '';
  searchTerm = '';
  constructor(private router: Router, private userService: UserService, private cookieService: CookieService) {
    this.cookieValue = cookieService.get('username');
  }

  ngOnInit() {
  }
  // onSearch(f: NgForm) {
  //
  // }
  searchGif = () => {
    this.router.navigate(['/gif/search/' + this.searchTerm]);
  }
  searchUsers = () => {
    this.router.navigate(['/user/' + this.searchTerm]);
  }

  onLogout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }


}
