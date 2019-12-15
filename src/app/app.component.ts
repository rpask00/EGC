import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { slide } from './route-animations';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './SERVICES/login.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slide
  ]
})
export class AppComponent implements OnInit, AfterViewChecked {

  @ViewChild('toolbar', { read: ElementRef }) toolbar: ElementRef
  @ViewChild('footer', { read: ElementRef }) footer: ElementRef
  @ViewChild('bgImg', { read: ElementRef }) bgImg: ElementRef
  fireUser$: Observable<any>

  constructor(
    private router: Router,
    private loginSv: LoginService
  ) {
    this.fireUser$ = this.loginSv.islogged
  }


  width: number = window.innerWidth;
  location: string;
  ngAfterViewChecked() {
    this.location = window.location.pathname;
    if (window.location.pathname === '/home') {
      // (this.toolbar.nativeElement as HTMLElement).parentElement.style.backgroundColor = 'transparent';
      // (this.toolbar.nativeElement as HTMLElement).parentElement.style.position = 'fixed';
      (this.footer.nativeElement.parentElement as HTMLElement).classList.add('footer-on-home');
      (this.bgImg.nativeElement as HTMLElement).style.opacity = '.7';
    } else {
      (this.toolbar.nativeElement as HTMLElement).parentElement.style.backgroundColor = '#030a13';
      // (this.toolbar.nativeElement as HTMLElement).parentElement.style.position = 'static';
      (this.footer.nativeElement.parentElement as HTMLElement).classList.remove('footer-on-home');
      (this.bgImg.nativeElement as HTMLElement).style.opacity = '1';
    }

  }
  ngOnInit() {
    window.addEventListener('resize', () => this.width = window.innerWidth);
  }


  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  logout() {
    this.loginSv.logout()
  }



}
