import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  backendURL = '';

  constructor(private cookieService: CookieService) {
    // this.backendURL = 'http://localhost:4000/';
    this.backendURL = 'https://wbdv-sp19-gif-art-server.herokuapp.com/api';
  }

  getUser() {
    return fetch(this.backendURL+"api/session/user", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json());
  }

  registerUser(user){
    return fetch(this.backendURL + "register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then((response) => response.json());
  }

  loginUser(user){
    return fetch(this.backendURL + "login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then((response) => response.json());
  }

  updateUser(userId, user){
    return fetch(this.backendURL + "api/user/" + userId, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then((response) => response.json());
  }

  setSession(response) {
    console.log('in  user service', response);
    const expiresIn = moment().add(response.expiresIn, 'hours');
    console.log(expiresIn.format('LLL'));
    console.log("Moment", moment());
    console.log("ExpiresIn" ,expiresIn);
    localStorage.setItem("expiresIn", JSON.stringify(expiresIn));
    this.cookieService.set("token", response.token);
    this.cookieService.set("username", response.user.username);
    this.cookieService.set("role", response.user.role); // 'ADMIN', 'COMMONUSER','CONTENTCREATOR'
    this.cookieService.set("userId", response.user._id);
  }

  logout(){
    return fetch(this.backendURL + "logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      localStorage.removeItem("expiresIn");
      this.cookieService.deleteAll();
    })
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expiresIn");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  likeGif(info){
    return fetch(this.backendURL + "api/like", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(info)
    }).then((response) => response.json());
  }

  unlikeGif(info){
    return fetch(this.backendURL + "api/unlike", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(info)
    }).then((response) => response.json());
  }

  getAllUsers = () => {
    return fetch(this.backendURL + 'api/user', {
      method: 'get',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json());
  }
  getUserById = (userId) => {
    return fetch(this.backendURL + 'api/user/'+ userId, {
      method: 'get',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json());
  }

  follow = (followerId) => {
    return fetch(this.backendURL + 'api/follow', {
      method: 'put',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({
        followId: followerId
      })
    }).then((response) => response.json());
  }
  unfollow = (followerId) => {
    console.log("inside unfollow");
    return fetch(this.backendURL + 'api/unfollow', {
      method: 'put',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({
        unfollowId: followerId
      })
    }).then((response) => {
      console.log(response);
      response.json();
    });
  }

  deleteUser = (userId) => {
    return fetch(this.backendURL + 'api/user/' + userId, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      console.log(response);
      response.json();
    });
  }

  createUser = (user) => {
    return fetch(this.backendURL + 'api/user' , {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    }).then((response) => {
      return response.json();
    });
  }
}
