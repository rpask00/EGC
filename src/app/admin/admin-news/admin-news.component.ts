import { Component, OnInit, ViewChild, ViewChildren, ElementRef, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NewsService } from 'src/app/SERVICES/news.service';
import { TimeService } from 'src/app/SERVICES/time.service';

@Component({
  selector: 'admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.scss']
})



export class AdminNewsComponent implements OnInit {

  today: Date = new Date();
  image: string;
  form: FormGroup;

  csUrl = 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/6d/6d448876809d7b79aa8f070271c07b1296459400_full.jpg';
  lolUrl = 'https://res.cloudinary.com/teepublic/image/private/s--SRABn1B---/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1539296610/production/designs/3303813_0.jpg';

  @ViewChild('avatar', { read: ElementRef }) avatar: ElementRef;

  constructor(
    private newsSrv: NewsService,
    private timeSrv: TimeService
  ) {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      desc: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      game: new FormControl('cs', {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      image: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    })
  }

  toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  ngOnInit() { }

  async file(e) {
    this.image = await this.toBase64(e.target.files[0]) as string;
    this.form.value.image = e.target.files[0];
  }
  avatarImage() {
    if (this.form.value.game == 'cs')
      this.avatar.nativeElement.src = this.csUrl;
    else
      this.avatar.nativeElement.src = this.lolUrl;
  }

  save() {
    this.newsSrv.saveNews({
      image: this.form.value.image,
      title: this.form.value.title,
      desc: this.form.value.desc,
      game: this.form.value.game == 'cs' ? this.csUrl : this.lolUrl,
      date: this.today.getTime()
    }).then(res => {
      this.form.reset()
      this.image = null;
    })
  }

}
