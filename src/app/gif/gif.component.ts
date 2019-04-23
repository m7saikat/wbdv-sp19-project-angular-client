import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GiphyService} from "../services/giphy.service";
import {UserService} from '../services/user.service';
import {CookieService} from 'ngx-cookie-service';
import {NgForm} from "@angular/forms";
import {GifService} from '../services/gif.service';

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
  comments = [];
  cookieValue = '';

  constructor(private route: ActivatedRoute, private giphyService: GiphyService, private router: Router, private userService: UserService,
              private cookieService: CookieService, private gifService: GifService) {
    this.cookieValue = this.cookieService.get("username");
    this.route.params.subscribe((params) => {
      this.gifId = params.gifId;
      this.displayGif = false;

      this.giphyService.getGifById(this.gifId).then((response) => {
        this.gif = response.data;
        this.displayGif = true;
      });

      this.gifService.getComments(this.gifId).then((response) => {
        console.log(response);
        response.map((comment) => {
          this.userService.getUserById(comment.createdByuser).then((user) => {
            console.log(user);
            this.comments.push({
              username: user.username,
              text: comment.text
            });
          });
        });
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

  onCommentSubmit(f: NgForm){
    this.gifService.createComment(this.gifId, f.value.comment).then((res) => {
      console.log(res);

      this.comments.push({
        username: this.cookieService.get("username"),
        text: f.value.comment
            });

    });
  }
}
