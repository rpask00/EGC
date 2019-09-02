import { Component, OnInit, ViewChild } from '@angular/core';
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
  CSimg: string = 'http://www.yagmurhaber.com/wp-content/uploads/2018/10/CS-GO-kodlar%C4%B1-631x354.jpg'
  LOLimg: string = 'https://a.allegroimg.com/s400/030c75/47f08daf478b9021974cf159b96a/Konto-League-of-Legends-30-lvl-EUNE-Unranked-Smurf';
  constructor(
    private imgSrv: ImageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.labels$ = this.imgSrv.getLabels()
  }


}
