import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  backendURL = '';
  constructor() {
    this.backendURL = 'http://localhost:3000/api';
  }

  getUser(userId) {
    return fetch(this.backendURL + "/student/"+123, {
      method: "GET"
    }).then((response) => response.json());
  }

  registerUser(user){
    return fetch("http://localhost:4000/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(user)
    }).then((response) => response.json());
  }

  loginUser(user){
    return fetch("http://localhost:4000/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(user)
    }).then((response) => response.json());
  }

  // getSearchedGifs(searchTerm) {
  //   return fetch(this.giphyURL + "/v1/gifs/search"+"?"+"api_key="+this.api_Key+"&q="+searchTerm+"&limit=15").then((response) => response.json())
  // }
  //
  // getGifById(gifId){
  //   return fetch(this.giphyURL + "/v1/gifs/"+gifId+"?"+"api_key="+this.api_Key).then((response) =>
  //     response.json()
  //   )
  // }
}
