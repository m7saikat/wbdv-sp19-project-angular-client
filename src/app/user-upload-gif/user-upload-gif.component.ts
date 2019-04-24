import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from '../services/user.service';

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
  constructor(private route: ActivatedRoute, private cookieService: CookieService, private userService: UserService) {
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

}
