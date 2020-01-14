import { Component, OnInit } from '@angular/core';
import { Match } from '../MODELS/match.model';
import { ScheduleService } from 'src/app/SERVICES/schedule.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  private matches$: Observable<Match[]>
  private matches_ended$: Observable<Match[]>
  constructor(
    private ScheduleSv: ScheduleService
  ) { }

  ngOnInit() {
    this.matches$ = this.ScheduleSv.matches$.pipe(
      map(ms => {
        ms.sort((a, b) => {
          let x = new Date(a.date);
          let y = new Date(b.date);
          return x > y ? -1 : x < y ? 1 : 0;
        })
        ms.reverse()
        return ms
      }),
      map(ms => {
        return ms.map(m => {
          m.date = new Date(m.date)
          let hr = m.date.getHours() < 10 ? `0${m.date.getHours()}` : m.date.getHours()
          let min = m.date.getMinutes() < 10 ? `0${m.date.getMinutes()}` : m.date.getMinutes()
          m.time = `${hr}:${min}`
          return m
        }).filter(m => !m.score_team_a && !m.score_team_b)
      })
    )
    this.matches$.subscribe(r => console.log(r.length == 0))

    this.matches_ended$ = this.ScheduleSv.matches$.pipe(
      map(ms => {
        ms.sort((a, b) => {
          let x = new Date(a.date);
          let y = new Date(b.date);
          return x > y ? -1 : x < y ? 1 : 0;
        })
        return ms
      }),
      map(ms => {
        return ms.map(m => {
          m.date = new Date(m.date)
          let hr = m.date.getHours() < 10 ? `0${m.date.getHours()}` : m.date.getHours()
          let min = m.date.getMinutes() < 10 ? `0${m.date.getMinutes()}` : m.date.getMinutes()
          m.time = `${hr}:${min}`
          return m
        }).filter(m => m.score_team_a && m.score_team_b)
      })
    )

  }

}
