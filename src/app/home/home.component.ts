import { Component, OnInit } from '@angular/core';
import {GiphyService} from "../services/giphy.service";
import {Router} from "@angular/router";
import {CookieService} from 'ngx-cookie-service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  gifs: any[];
  userLikes: any[] = [];
  hasLikes: boolean;
  cookieValue = "";
  constructor(private giphyService: GiphyService, private router: Router, private cookieService: CookieService, private userService: UserService) {
    console.log('**************',cookieService.get("username"));
    this.cookieValue = cookieService.get("username");

    this.giphyService.getTrending().then((response) => {
      this.gifs = response.data;
    });

    if(this.cookieValue !== ''){
      this.userService.getUser().then((response) => {
        if (!response.likes || response.likes.length === 0){
          this.hasLikes = false;
        } else{
          this.hasLikes = true;
          // response.likes.map((like) => {
          //   this.giphyService.getGifById(like).then((gif) => {
          //     this.userLikes.push(gif);
          //   });
          // });
          this.userLikes = response.likes;
          console.log('^^^', this.userLikes);
        }
      });
    }

  }

  ngOnInit() {
  }

  onGifClick(gifId, gifUrl) {
    this.router.navigate(['gif', gifId], { queryParams: { url: gifUrl } });
  }

  onFavGifClick(gifId) {
    console.log(gifId.split("/")[4]);
    this.router.navigate(['gif', gifId.split("/")[4]], { queryParams: { url: gifId } });
  }

}
