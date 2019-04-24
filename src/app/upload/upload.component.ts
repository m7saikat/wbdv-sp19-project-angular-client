import { Component, OnInit } from '@angular/core';
import {GifService} from '../services/gif.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  gifLink: string;
  gifTitle: string;
  constructor(private gifService: GifService) { }

  ngOnInit() {
  }

  addGif = () => {
    this.gifService.uploadGif(this.gifTitle, this.gifLink);
  }

}
