import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GiphyService} from "../services/giphy.service";
import {UserService} from '../services/user.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-gif',
  templateUrl: './gif.component.html',
  styleUrls: ['./gif.component.css']
})
export class GifComponent implements OnInit {

  gifId: string;
  gif = '';
  userId: any;
  displayGif;
  isCopyLinkClicked = false;

  constructor(private route: ActivatedRoute, private giphyService: GiphyService, private router: Router, private userService: UserService, private cookieService: CookieService) {
    this.route.params.subscribe((params) => {
      this.gifId = params.gifId;
      this.displayGif = false;

      this.giphyService.getGifById(this.gifId).then((response) => {
        this.gif = response.data;
        this.displayGif = true;
      });
    });

    this.userId = this.cookieService.get("userId");
  }

  ngOnInit() {
  }

  onGifClick(gifId){
    this.router.navigate(['gif',gifId]);
  }

  onCopyLinkClick(){
    this.isCopyLinkClicked = true;
  }

  onCloseClick(){
    this.isCopyLinkClicked = false;
  }

  onLikeGifClick(){
    this.userService.likeGif({
      gifId: this.gifId,
      userId: this.userId
    }).then((response) => {
    });
  }
}
