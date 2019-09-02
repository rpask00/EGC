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
    @Inject(MAT_DIALOG_DATA) public data: { img: string }
  ) { }

  ngOnInit() {
   document.addEventListener('click', () => {
      if (this.click) this.onClose(this.dialogRef)
      this.click++;
    })

  document.addEventListener('keyup', () => {
      this.onClose(this.dialogRef)
    })

  }

  onClose(dialogRef) {
    dialogRef.close()
  }

}
