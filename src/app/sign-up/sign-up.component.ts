import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TeamsService } from "../SERVICES/teams.service";
import { Router } from "@angular/router";
import { CustomValidator } from '../validators/custom-validators';
import { MatDialog } from '@angular/material';

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUPComponent implements OnInit {
  @ViewChild("team", { read: ElementRef }) teamName: ElementRef;
  forms: FormGroup[] = [];
  formValid: boolean = false;
  team_Form: FormGroup;
  checked: boolean = false;
  constructor(
    private teamSv: TeamsService,
    private router: Router,
  ) {
    this.team_Form = new FormGroup({
      team: new FormControl(null, {
        updateOn: "change",
        validators: [Validators.required]
      }),
      phone: new FormControl(null, {
        updateOn: "change",
        validators: [
          Validators.required,
          CustomValidator.onlyNumbers
        ]
      }),
      email: new FormControl(null, {
        updateOn: "change",
        validators: [Validators.required]
      })
    });
  }

  ngOnInit() { }

  getForm(e) {
    if (e) this.forms[e.index] = e.form;
    this.formValid =
      !this.forms.map(form => form.valid).includes(false) &&
      this.forms.length == 5 &&
      this.teamName.nativeElement.value &&
      this.team_Form.valid &&
      this.checked
  }


  sign_up() {
    const team = {
      players: this.forms.map((form: FormGroup) => {
        return form.value;
      }),
      team_name: this.team_Form.value.team,
      phone: this.team_Form.value.phone,
      email: this.team_Form.value.email
    };

    this.teamSv.sing_up_team(team);

    this.router.navigateByUrl(
      `/sign-up-succed/${this.teamName.nativeElement.value}`
    );
  }

}
