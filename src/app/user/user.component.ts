import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GiphyService} from '../services/giphy.service';
import {GifService} from '../services/gif.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  isLoaded = false;
  userId;
  user;
  hasLikes = false;
  userLikes = [];
  uploads: any[] = [];
  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private giphyService: GiphyService, private gifService: GifService, private router: Router) {
    this.activatedRoute.params.subscribe((params) => {
      this.userId = params.profileId;
      this.userService.getUserById(this.userId).then((response) => {
        this.user = response;
        this.isLoaded = true;
        this.gifService.getUploadByUserId(this.user._id).then((res) => {
          this.uploads = res;
        })
        if (response.likes.length === 0) {
          this.hasLikes = false;
        } else {
          this.hasLikes = true;
          response.likes.map((like) => {
            // this.giphyService.getGifById(like).then((gif) => {
            //   this.userLikes.push(gif.data.images.fixed_height.url);
            // });
            this.userLikes.push(like);
          });
        }
      });
    });



  }

  goToUserUploadGif = (gifUrl) => {
    this.router.navigate(['/gif/upload/', {gifUrl}]);
  }

  ngOnInit() {
  }

}
