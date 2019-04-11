import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GiphyService} from "../services/giphy.service";

@Component({
  selector: 'app-searched-gifs',
  templateUrl: './searched-gifs.component.html',
  styleUrls: ['./searched-gifs.component.css']
})
export class SearchedGifsComponent implements OnInit {

  searchedTerm = '';
  gifs: any[];
  constructor(private route: ActivatedRoute, private giphyService: GiphyService, private router: Router) {
    this.route.params.subscribe((params) => {
      this.searchedTerm = params.searchTerm;
      this.gifs = [];

      this.giphyService.getSearchedGifs(this.searchedTerm).then((response) => {
        this.gifs = response.data
      })
    })
  }

  ngOnInit() {
  }

  onGifClick(gifId){
    this.router.navigate(['gif',gifId]);
  }

}
