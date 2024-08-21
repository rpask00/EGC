import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  constructor() {}

  ngOnInit() {}

  getDate(date: Date | number): string {
    if (typeof date == 'number') {
      date = new Date(date);
    }

    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  }
}
