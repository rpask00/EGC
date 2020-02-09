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
  CSimg: Observable<any>
  LOLimg: Observable<any>


  constructor(
    private imgSrv: ImageService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.labels$ = this.imgSrv.getLabels()
    this.CSimg = this.imgSrv.getImage('COVER/cs-gallery.png')
    this.LOLimg = this.imgSrv.getImage('COVER/lol-gallery.png')

  }


}

