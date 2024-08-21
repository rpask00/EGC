import {Injectable} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFireDatabase} from '@angular/fire/database';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  downloadURL: Observable<string>;

  constructor(
    private fireStorage: AngularFireStorage,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {}

  upload(images: File[], title: string) {
    // for (let i = 0; i < images.length; i++) {
    //   const file = images[i]
    //   const path = `${title}/${file.name}`;

    //   this.fireStorage.upload(path, file).then(cos => {
    //     this.downloadURL = this.fireStorage.ref(path).getDownloadURL()
    //     this.db.list(`photo/${title}`).push({ path })
    //   });

    // }
    let index = 0;
    return new Promise((res, rej) => {
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const path = `${title}/${file.name}`;

        this.fireStorage.upload(path, file).then((cos) => {
          this.downloadURL = this.fireStorage.ref(path).getDownloadURL();
          this.db.list(`photo/${title}`).push({path});
          index++;
          if (index === images.length) res('Przesyłanie zakończone');
        });
      }
    });
  }

  uploadOne(file: File) {
    const path = `NEWS/${file.name}`;

    this.fireStorage.upload(path, file).then((cos) => {
      this.downloadURL = this.fireStorage.ref(path).getDownloadURL();
    });

    return path;
  }

  getLabels() {
    return this.db
      .object('/photo')
      .valueChanges()
      .pipe(
        map((ob: any) => {
          const map: string[] = [];
          const indexArr: number[] = [];
          for (const key in ob) {
            let index = 0;
            for (const img in ob[key]) {
              index++;
            }
            indexArr.push(index);
            map.push(key);
          }
          return map
            .filter((key) => key.slice(0, 2) == 'CS' || key.slice(0, 2) == 'LO')
            .map((key, i) => {
              return {key, quantity: indexArr[i]};
            }) as {key: string; quantity: number}[];
        })
      );
  }

  getPhotos(folderName: string): Observable<string[]> {
    return this.db
      .list('/photo/' + folderName)
      .valueChanges()
      .pipe(
        map((imgs) => imgs.map((img: {path: string}) => this.fireStorage.ref(img.path).getDownloadURL())),
        switchMap((arr) => {
          return forkJoin(...arr);
        })
      );
  }

  getImage(path: string): Observable<any> {
    return this.fireStorage.ref(path).getDownloadURL();
  }
}
