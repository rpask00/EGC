import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFireDatabase} from '@angular/fire/database';
import {News} from '../MODELS/news.model';
import {map} from 'rxjs/operators';
import {ImageService} from './image.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  downloadURL: Observable<string>;

  constructor(
    private fireStorage: AngularFireStorage,
    private db: AngularFireDatabase,
    private imgSrv: ImageService
  ) { }

  ngOnInit() {
  }



  saveNews(news: News) {
    news.image = this.imgSrv.uploadOne(news.image as File)
    return this.db.list('/NEWS').push(news)
  }


  getNews() {
    return this.db.list('/NEWS').valueChanges().pipe(
      map((news: News[]) => {
        news = news.map((nowy: News) => {
          return {
            ...nowy,
            image: this.fireStorage.ref(nowy.image as string).getDownloadURL()
          }
        })

        let time = news.map(nowy => nowy.date).sort().reverse()
        return time.map(time => news.find(news => news.date === time))
      })
    )
  }

}
