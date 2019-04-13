import { Component, OnInit } from '@angular/core';
import {GiphyService} from "../services/giphy.service";
import {Router} from "@angular/router";
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  gifs: any[];
  constructor(private giphyService: GiphyService, private router: Router, private cookieService: CookieService) {
    this.giphyService.getTrending().then((response) => {
      this.gifs = response.data;
    });
  }

  ngOnInit() {
  }

  onGifClick(gifId){
    this.router.navigate(['gif',gifId]);
  }

}
