import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ImageService } from "src/app/SERVICES/image.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-admin-gallery",
  templateUrl: "./admin-gallery.component.html",
  styleUrls: ["./admin-gallery.component.scss"]
})
export class AdminGalleryComponent implements OnInit {
  form: FormGroup;
  images: File[] = [];
  constructor(private imageSrv: ImageService, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.form = new FormGroup({
      images: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      }),
      title: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      })
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, null, {
      duration: 2000
    });
  }

  saveImagses(images: FileList) {
    for (let i = 0; i < images.length; i++) this.images.push(images.item(i));
  }

  upload() {
    this.imageSrv
      .upload(this.images, this.form.value.title)
      .then((res: string) => {
        const snackbar = this.openSnackBar.bind(this);
        snackbar(res);
        this.images = [];
        this.form.reset();
      });
  }
}
