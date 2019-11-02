import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {
  }

  sing_up_team(team) {
    this.db.list('teams').push(team)
  }


}