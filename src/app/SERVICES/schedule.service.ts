import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Match } from '../MODELS/match.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  add_match(match: Match) {
    console.log(match)
    return this.db.list('/SCHEDULE').push(match)
  }

  get matches$(): Observable<Match[]> {
    return this.db.list('/SCHEDULE').valueChanges() as Observable<Match[]>
  }

}


