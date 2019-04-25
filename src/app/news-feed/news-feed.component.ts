import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {GiphyService} from '../services/giphy.service';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {

  cookieValue = '';
  currentUser;
  followers: any[] = [];
  gifs: any[] = [];
  constructor(private cookieService: CookieService, private userService: UserService, private router: Router, private giphyService: GiphyService) {
    this.cookieValue = cookieService.get('username');

    if (this.cookieValue !== '') {
      this.userService.getUser().then((response) => {
        this.currentUser = response;
        for (const f of this.currentUser.followers) {
          this.userService.getUserById(f).then((response) => {
            this.followers.push(response);
            for (const like of response.likes) {
              // this.giphyService.getGifById(like).then((res) => {
              //   const r = {
              //     username : response.username ,
              //     link : res.data.images.fixed_height.url,
              //     id : like
              //   };
              const r = {
                username : response.username,
                link: like
              };
              this.gifs.push(r);
              console.log(this.gifs);
              // });
            }
          });
        }
      });
    }
  }

  ngOnInit() {
  }
  onGifClick(gifId) {
    this.router.navigate(['gif', gifId]);
  }
  getGifById = (gifId) => {
    this.giphyService.getGifById(gifId).then((response) => {
      return response.data.images.fixed_height.url;
    });
  }

}
