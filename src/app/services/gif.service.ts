import { Injectable } from '@angular/core';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  backendURL = '';

  constructor(private userService: UserService) {
    this.backendURL = 'http://localhost:4000/';
    // this.backendURL = 'https://wbdv-sp19-gif-art-server.herokuapp.com/';
  }

  createComment(gifId, comment) {
    console.log('GifId', gifId);
    console.log('Comment', comment);
    console.log('Comment', typeof comment);
    return fetch(this.backendURL + 'api/comment', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        gifId,
        comment
      })
    }).then((response) => response.json());
  }

  deleteComment(commentId) {
    return fetch(this.backendURL + 'api/comment', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        commentId
      })
    }).then((response) => response.json());
  }

  getComments(gifId) {
    return fetch(this.backendURL + 'api/gif/' + gifId + '/comment', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json());
  }
  uploadGif = (title, url) => {
    console.log(title);
    console.log(url);
    this.userService.getUser().then((response) => {
      console.log(response);
      const user = response;
      const body = {
        gifURl : url,
        gifTitle: title,
        createdBy: user
      };
      console.log(body);
      return fetch(this.backendURL + 'api/gif', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then((res) => {
      console.log(res);
      });
    });
  }

  getUploads = () => {
    return fetch(this.backendURL + 'api/created' , {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json());
  }
  getUploadByUserId = (id) => {
    return fetch(this.backendURL + 'api/created/' + id , {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json());
  }
}
