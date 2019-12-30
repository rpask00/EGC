import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Match } from '../../MODELS/match.model';
import { ScheduleService } from 'src/app/SERVICES/schedule.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-schedule',
  templateUrl: './admin-schedule.component.html',
  styleUrls: ['./admin-schedule.component.scss']
})
export class AdminScheduleComponent implements OnInit {

  form: FormGroup
  private matches$: Observable<Match[]>
  private matches_payload$: Observable<any>
  private current_match: string = ''
  constructor(
    private ScheduleSv: ScheduleService
  ) {
    this.form = new FormGroup({
      status: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      score_team_a: new FormControl(null, {
        updateOn: 'blur',
      }),
      team_a: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      score_team_b: new FormControl(null, {
        updateOn: 'blur',
      }),
      team_b: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      format: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      date: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      live: new FormControl(false, {
        updateOn: 'blur',
      }),
    })
  }

  ngOnInit() {
    this.matches_payload$ = this.ScheduleSv.matches_payload$
  }

  upload() {
    const match: Match = {
      status: this.form.value.status,
      team_a: this.form.value.team_a,
      team_b: this.form.value.team_b,
      format: this.form.value.format,
      date: this.form.value.date,
      live: this.form.value.live
    }

    if (!this.current_match) {
      this.ScheduleSv.add_match(match).then(res => {
        this.current_match = ''
        this.form.reset()
      })
    } else {
      match.score_team_a = this.form.value.score_team_a ? this.form.value.score_team_a : null
      match.score_team_b = this.form.value.score_team_b ? this.form.value.score_team_b : null
      match.live = this.form.value.live

      this.ScheduleSv.update_match(this.current_match, match).then(res => {
        this.current_match = ''
        this.form.reset()
      })
    }

  }

  edit(m) {
    const { status, team_a, score_team_a, team_b, score_team_b, format, date, live } = m.payload.val()
    this.current_match = m.key
    this.form.controls['status'].setValue(status);
    this.form.controls['team_a'].setValue(team_a);
    this.form.controls['score_team_a'].setValue(score_team_a);
    this.form.controls['team_b'].setValue(team_b);
    this.form.controls['score_team_b'].setValue(score_team_b);
    this.form.controls['format'].setValue(format);
    this.form.controls['date'].setValue(date);
    this.form.controls['live'].setValue(live);
  }
}
