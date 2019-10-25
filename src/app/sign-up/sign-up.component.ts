import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUPComponent implements OnInit {

  @ViewChild('teamName', { read: ViewContainerRef }) teamName: ElementRef;
  forms: FormGroup[] = [];
  formValid: boolean = false;
  constructor() { }

  ngOnInit() {}

  getForm(e) {
    this.forms[e.index] = e.form;
    this.formValid = !this.forms.map(form => form.valid).includes(false) && this.forms.length == 5;
  }

}