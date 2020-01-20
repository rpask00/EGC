import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked
} from "@angular/core";
import { ImageService } from "../SERVICES/image.service";
import { Observable } from "rxjs";
import { FormGroup, FormControl } from "@angular/forms";
import { News } from "../MODELS/news.model";
import { NewsService } from "../SERVICES/news.service";
import { take } from "rxjs/operators";
import { TimeService } from "../SERVICES/time.service";

@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.scss"]
})
export class NewsComponent implements OnInit {
  example: News;
  imgArr: Observable<string[]>;
  news$: Observable<News[]>;
  form: FormGroup;
  images: File[] = [];


  constructor(
    private imageSrv: ImageService,
    private newsSrv: NewsService,
    private timeSrv: TimeService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      images: new FormControl(null, {
        updateOn: "blur"
      }),
      title: new FormControl(null, {
        updateOn: "blur"
      })
    });

    this.news$ = this.newsSrv.getNews();
    this.news$.pipe(take(1)).subscribe(news => {
      this.example = news[0];
    });
  }

  saveImagses(images: FileList) {
    for (let i = 0; i < images.length; i++) this.images.push(images.item(i));
  }

  upload() {
    this.imageSrv.upload(this.images, this.form.value.title);
  }

  changeExampleCard(news) {
    this.example = news;
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
}
