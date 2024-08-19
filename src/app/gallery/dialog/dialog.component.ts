import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  click: number = 0;
  dialogRef: MatDialogRef<DialogComponent>

  constructor(
    dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { img: string, imgArr: string[] }
  ) {
    this.dialogRef = dialogRef
  }

  ngOnInit() {
    document.addEventListener('click', e => {
      if (this.click && !(e.target instanceof HTMLImageElement)) this.onClose(this.dialogRef)
      this.click++;
    })

    document.addEventListener('keyup', e => {
      if (e.keyCode == 37)
        this.swipeLeft()
      else if (e.keyCode == 39)
        this.swipeRight()
      else
        this.onClose(this.dialogRef)

    })

  }

  swipeLeft() {
    let { img, imgArr } = this.data
    let index = imgArr.indexOf(img)
    this.data.img = imgArr[index - 1] ? imgArr[index - 1] : imgArr[index]
  }

  swipeRight() {
    let { img, imgArr } = this.data
    let index = imgArr.indexOf(img)
    this.data.img = imgArr[index + 1] ? imgArr[index + 1] : imgArr[index]
  }

  onClose(dialogRef) {
    dialogRef.close()
  }

}
