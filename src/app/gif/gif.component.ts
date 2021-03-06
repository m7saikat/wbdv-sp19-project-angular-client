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
  gif: any;
  userId: any;
  displayGif;
  isCopyLinkClicked = false;
  comments = [];
  cookieValue = '';
  isAlreadyLiked = false;
  url = '';

  constructor(private route: ActivatedRoute, private giphyService: GiphyService, private router: Router, private userService: UserService,
              private cookieService: CookieService, private gifService: GifService) {
    this.cookieValue = this.cookieService.get("username");
    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.url = params['url'];
      });
    this.route.params.subscribe((params) => {
      this.gifId = params.gifId;
      this.displayGif = false;

      this.giphyService.getGifById(this.gifId).then((response) => {
        this.gif = response.data;
        this.displayGif = true;
      });

      this.userService.getUserById(this.cookieService.get("userId")).then((u) => {
        u.likes.forEach((like) => {
          if (like.includes(this.gifId)){
            this.isAlreadyLiked = true;
          }
        });
      })

      this.gifService.getComments(this.gifId).then((response) => {
        console.log(response);
        response.map((comment) => {
          this.userService.getUserById(comment.createdByuser).then((user) => {
            this.comments.push({
              id: comment._id,
              username: user.username,
              text: comment.text,
              createdByuser: comment.createdByuser
            });
          });
        });
      });
    });

    this.userId = this.cookieService.get("userId");
    console.log(this.userId);
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

  onLikeGifClick() {
    this.isAlreadyLiked = true;
    this.userService.likeGif({
      // gifId: this.gifId,
      gifId: this.gif.images.fixed_height.url,
      userId: this.userId
    }).then((response) => {
    });
  }

  onUnLikeGifClick() {
    this.isAlreadyLiked = false;
    this.userService.unlikeGif({
      // gifId: this.gifId,
      gifUrl: this.url,
      userId: this.userId
    }).then((response) => {
      console.log(response);
    });
  }

  onCommentSubmit(f: NgForm){
    this.gifService.createComment(this.gifId, f.value.comment).then((res) => {
      console.log('****', res);

      this.comments.push({
        id: res._id,
        username: this.cookieService.get("username"),
        text: res.text,
        createdByuser: res.createdByuser
            });

    });
  }

  onDelComment(commentId) {
    this.gifService.deleteComment(commentId).then((res) => {
      console.log("delete comment", res);
      this.comments = this.comments.filter(comment => comment.id !== commentId);
    });
  }

  onEditComment(commentId){
    this.router.navigate(['gif', this.gifId, 'comment', commentId]);
  }
}
