import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  fireUser$: Observable<any>;
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.fireUser$ = this.afAuth.authState;
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['home']);
  }

  get islogged(): Observable<any> {
    return this.fireUser$;
  }

  log_in(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
}
