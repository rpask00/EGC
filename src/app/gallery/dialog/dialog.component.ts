import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  click: number = 0;
  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { img: string, imgArr: string[] }
  ) { }

  ngOnInit() {
    document.addEventListener('click', e => {
      console.log()
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

  private swipeLeft() {
    let { img, imgArr } = this.data
    let index = imgArr.indexOf(img)
    this.data.img = imgArr[index - 1] ? imgArr[index - 1] : imgArr[index]
  }

  private swipeRight() {
    let { img, imgArr } = this.data
    let index = imgArr.indexOf(img)
    this.data.img = imgArr[index + 1] ? imgArr[index + 1] : imgArr[index]
  }

  onClose(dialogRef) {
    dialogRef.close()
  }

}
