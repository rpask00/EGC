import { Component, OnInit } from '@angular/core';
import { Match } from '../MODELS/match.model';
import { ScheduleService } from 'src/app/SERVICES/schedule.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  private matches$: Observable<Match[]>
  constructor(
    private ScheduleSv: ScheduleService
  ) { }

  ngOnInit() {
    this.matches$ = this.ScheduleSv.matches$
    this.matches$.subscribe(console.log)
  }

}
