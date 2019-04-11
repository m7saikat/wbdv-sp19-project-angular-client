import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GiphyService} from "../services/giphy.service";

@Component({
  selector: 'app-gif',
  templateUrl: './gif.component.html',
  styleUrls: ['./gif.component.css']
})
export class GifComponent implements OnInit {

  gifId: string;
  gif = '';
  displayGif;
  isCopyLinkClicked = false;

  constructor(private route: ActivatedRoute, private giphyService: GiphyService, private router: Router) {
    this.route.params.subscribe((params) => {
      this.gifId = params.gifId;
      this.displayGif = false;

      this.giphyService.getGifById(this.gifId).then((response) => {
        console.log(response.data);
        this.gif = response.data;
        this.displayGif = true;
      })
    })
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
}
