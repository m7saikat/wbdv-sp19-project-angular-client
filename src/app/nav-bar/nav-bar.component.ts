import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  onSearch(f: NgForm){
    this.router.navigate(['gif','search',f.value.searchTerm])
  }

  onLogout(){
    this.userService.logout();
    this.router.navigate(['/login']);
  }


}
