import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Match } from '../../MODELS/match.model';
import { ScheduleService } from 'src/app/SERVICES/schedule.service';

@Component({
  selector: 'app-admin-schedule',
  templateUrl: './admin-schedule.component.html',
  styleUrls: ['./admin-schedule.component.scss']
})
export class AdminScheduleComponent implements OnInit {

  form: FormGroup
  constructor(
    private ScheduleSv: ScheduleService
  ) {
    this.form = new FormGroup({
      status: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      team_a: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
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
      time: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    })
  }

  ngOnInit() {
  }

  upload() {
    const day = `${(this.form.value.date as Date).getDay()}/${(this.form.value.date as Date).getMonth()}/${(this.form.value.date as Date).getFullYear()}`
    console.log(day)
    const match: Match = {
      status: this.form.value.status,
      team_a: this.form.value.team_a,
      team_b: this.form.value.team_b,
      time: this.form.value.time,
      format: this.form.value.format,
      date: day
    }
    this.ScheduleSv.add_match(match).then(res => {
      this.form.reset()
    })
  }
}
