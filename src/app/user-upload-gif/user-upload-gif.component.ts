import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from '../services/user.service';
import {GifService} from '../services/gif.service';

@Component({
  selector: 'app-user-upload-gif',
  templateUrl: './user-upload-gif.component.html',
  styleUrls: ['./user-upload-gif.component.css']
})
export class UserUploadGifComponent implements OnInit {
  isCopyLinkClicked = false;
  gifUrl;
  gifTitle;
  cookieValue;
  constructor(private route: ActivatedRoute, private cookieService: CookieService, private userService: UserService, private gifService: GifService, private router: Router) {
    this.cookieValue = this.cookieService.get("username");
    this.gifUrl = this.route.snapshot.paramMap.get('gifUrl');
  }
  onCopyLinkClick() {
    this.isCopyLinkClicked = true;
  }

  onCloseClick() {
    this.isCopyLinkClicked = false;
  }

  onLikeGifClick() {
    this.userService.getUser().then((response) => {
      const user = response;
      this.userService.likeGif({
        // gifId: this.gifId,
        gifId: this.gifUrl,
        userId: user._id
      }).then((res) => {
      });
    });
  }
  ngOnInit() {
  }

  onDeleteGif(){
    console.log(this.cookieService.get("userId"))
    this.gifService.getAllGifs().then((response) => {
      response.map((res) => {
        if (res.createdBy === this.cookieService.get("userId") && res.gifURl === this.gifUrl){
          console.log('Matching', res);
          this.gifService.deleteGif(res._id).then((r) => {
            this.router.navigate(['profile', this.cookieService.get("userId")]);
          });
        }
      });
    });
  }

}
