import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ImageService } from 'src/app/SERVICES/image.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ActivatedRoute } from '@angular/router';
import { slidePhoto } from 'src/app/route-animations';

@Component({
  selector: 'app-landscape',
  templateUrl: './landscape.component.html',
  styleUrls: ['./landscape.component.scss'],
  animations: [
    slidePhoto
  ]
})
export class LandscapeComponent implements OnInit {

  imgArr: Observable<string[]>
  key: string;
  form: FormGroup;
  images: File[] = [];
  constructor(
    private imageSrv: ImageService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.key = this.route.snapshot.paramMap.get('key')
    this.getPhotos(this.key)
  }

  getPhotos(folderName: string) {
    this.imgArr = this.imageSrv.getPhotos(folderName)
  }

  openDialog(img, imgArr) {
    if (this.dialog.openDialogs.length) return

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '60vw',
      height: '40vw',
      data: {
        img,
        imgArr
      }
    })

    dialogRef.afterClosed().subscribe();
  }


}
