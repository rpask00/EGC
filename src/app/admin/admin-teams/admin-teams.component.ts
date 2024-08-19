import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';

@Component({
  selector: 'admin-teams',
  templateUrl: './admin-teams.component.html',
  styleUrls: ['./admin-teams.component.scss']
})
export class AdminTeamsComponent implements OnInit {

  teams$: Observable<any>
  constructor(
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.teams$ = this.db.list('/teams').valueChanges()
  }

  delete_team(team) {
    console.log(team)
  }
}
