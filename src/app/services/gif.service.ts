import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  backendURL = '';

  constructor() {
    this.backendURL = 'http://localhost:4000/api';
  }

  createComment(gifId, comment){
    console.log('GifId', gifId);
    console.log('Comment', comment);
    console.log('Comment', typeof comment);
    return fetch(this.backendURL + "/comment", {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        gifId: gifId,
        comment: comment
      })
    }).then((response) => response.json());
  }

  getComments(gifId){
    return fetch(this.backendURL + "/gif/comment/" + gifId, {
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json());

  }
}
