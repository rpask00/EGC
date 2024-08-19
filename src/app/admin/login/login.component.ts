import {Component, OnInit} from '@angular/core';
import {LoginService} from 'src/app/SERVICES/login.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginSv: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  log_ig(e: any) {
    e.preventDefault()
    let email = e.target.querySelector('.email').value
    let password = e.target.querySelector('.password').value

    this.loginSv.log_in(email, password).catch(err => {
      alert('Niepoprawne dane')
    })

    this.loginSv.islogged.subscribe(usr => {
      if (usr) this.router.navigate(['admin'])
    })
  }

}
