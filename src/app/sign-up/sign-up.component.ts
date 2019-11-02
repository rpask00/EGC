import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { TeamsService } from '../SERVICES/teams.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUPComponent implements OnInit {

  @ViewChild('team', { read: ElementRef }) teamName: ElementRef;
  forms: FormGroup[] = [];
  formValid: boolean = false;
  constructor(
    private teamSv: TeamsService,
    private router: Router
  ) { }

  ngOnInit() { }

  getForm(e) {
    if (e) this.forms[e.index] = e.form;
    this.formValid = !this.forms.map(form => form.valid).includes(false) && this.forms.length == 5 && this.teamName.nativeElement.value;
    console.log(this.forms)
  }

  sign_up() {
    const team = {
      players: this.forms.map((form: FormGroup) => {
        return form.value
      }),
      team_name: this.teamName.nativeElement.value
    }

    this.teamSv.sing_up_team(team)

    this.router.navigateByUrl(`/sign-up-succed/${this.teamName.nativeElement.value}`)
  }



}