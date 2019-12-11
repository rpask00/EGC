import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImageService } from '../SERVICES/image.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {


  labels$: Observable<{ key: string; quantity: number; }[]>
  CSimg: string = 'https://menworld.pl/wp-content/uploads/2019/11/csgo.jpg'
  LOLimg: string = 'https://eune.leagueoflegends.com/sites/default/files/styles/scale_xlarge/public/upload/league-newlogo-banner.jpg?itok=oErYYqim';
  constructor(
    private imgSrv: ImageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.labels$ = this.imgSrv.getLabels()
  }


}
