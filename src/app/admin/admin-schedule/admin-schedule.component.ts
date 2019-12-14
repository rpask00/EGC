import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Match } from '../../MODELS/match.model';
import { ScheduleService } from 'src/app/SERVICES/schedule.service';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-schedule',
  templateUrl: './admin-schedule.component.html',
  styleUrls: ['./admin-schedule.component.scss']
})
export class AdminScheduleComponent implements OnInit {

  form: FormGroup
  private matches$: Observable<Match[]>
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
      // time: new FormControl(null, {
      //   updateOn: 'blur',
      //   validators: [Validators.required]
      // })
    })
  }

  ngOnInit() {
    this.matches$ = this.ScheduleSv.matches$.pipe(take(1))

  }

  upload() {
    const match: Match = {
      status: this.form.value.status,
      team_a: this.form.value.team_a,
      team_b: this.form.value.team_b,
      format: this.form.value.format,
      date: this.form.value.date
    }
    this.ScheduleSv.add_match(match).then(res => {
      this.form.reset()
    })
  }

  edit(m) {
    console.log(m)
    this.form.controls['status'].setValue(m.status);
    this.form.controls['team_a'].setValue(m.team_a);
    this.form.controls['score_team_a'].setValue(m.score_team_a);
    this.form.controls['team_b'].setValue(m.team_b);
    this.form.controls['score_team_b'].setValue(m.score_team_b);
    this.form.controls['format'].setValue(m.format);
    this.form.controls['date'].setValue(m.date);
  }
}
