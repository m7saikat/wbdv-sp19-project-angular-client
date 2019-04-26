import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GiphyService} from '../services/giphy.service';
import {NgForm} from '@angular/forms';
import {GifService} from '../services/gif.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {

  gif: any;
  displayGif = false;
  gifId;
  commentId;
  comment = {
    text: ''
  };
  displayComment = false;
  constructor(private activatedRoute: ActivatedRoute, private giphyService: GiphyService, private gifService: GifService, private router: Router){
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);
      this.gifId = params.gifId;
      this.commentId = params.commentId;
      this.gifService.findCommentById(this.commentId).then((response) => {
        console.log('Retrieved comment', response);
        this.comment = response;
        this.displayComment = true;
      });
    });



    this.giphyService.getGifById(this.gifId).then((response) => {
      this.gif = response.data;
      this.displayGif = true;
    });
  }

  ngOnInit() {
  }

  onCommentEdit(f: NgForm){
    console.log(f.value);
    this.gifService.editComment(this.commentId, f.value.comment).then((response) => {
      console.log('After edit response', response);
      this.router.navigate(['gif', this.gifId]);
    });
  }
}
