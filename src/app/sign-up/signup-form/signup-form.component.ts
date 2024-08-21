import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  @Output('sendForm') sendForm: EventEmitter<{index: number; form: FormGroup}> = new EventEmitter();
  @Input('index') index: number;
  form: FormGroup;
  constructor() {
    this.form = new FormGroup({
      imie: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      nazwisko: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      nick: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      steam: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    });
  }

  ngOnInit() {}

  updateForm() {
    this.sendForm.emit({index: this.index, form: this.form});
  }
}
