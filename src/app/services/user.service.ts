import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  backendURL = '';

  constructor(private cookieService: CookieService) {
    this.backendURL = 'http://localhost:4000/api';
  }

  getUser() {
    let info = {
      username : this.cookieService.get("username")
    }
    return fetch(this.backendURL+"/user/profile", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(info)
    }).then((response) => response.json());
  }

  registerUser(user){
    return fetch("http://localhost:4000/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then((response) => response.json());
  }

  loginUser(user){
    return fetch("http://localhost:4000/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then((response) => response.json());
  }

  likeGif(info){
    return fetch("http://localhost:4000/api/like", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(info)
    }).then((response) => response.json());
  }
}
