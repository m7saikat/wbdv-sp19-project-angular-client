import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  giphyURL = '';
  api_Key = 'fk3MBBBRoLPAkvVveYspA8Io1vts6h7k';
  constructor() {
    this.giphyURL = "http://api.giphy.com"
  }

  getTrending() {
    return fetch(this.giphyURL + "/v1/gifs/trending"+"?"+"api_key="+this.api_Key+"&limit=28", {
      method: "GET"
    }).then((response) => response.json());
  }

  getSearchedGifs(searchTerm) {
    return fetch(this.giphyURL + "/v1/gifs/search"+"?"+"api_key="+this.api_Key+"&q="+searchTerm+"&limit=15").then((response) => response.json())
  }

  getGifById(gifId){
    return fetch(this.giphyURL + "/v1/gifs/"+gifId+"?"+"api_key="+this.api_Key).then((response) =>
      response.json()
    )
  }
}
