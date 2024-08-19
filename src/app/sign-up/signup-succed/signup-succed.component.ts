import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-signup-succed',
  templateUrl: './signup-succed.component.html',
  styleUrls: ['./signup-succed.component.scss']
})
export class SignupSuccedComponent implements OnInit {

  team: String

  constructor(
    private acRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.team = this.acRoute.snapshot.paramMap.get('team')
  }

}
