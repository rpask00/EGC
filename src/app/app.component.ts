import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { slide } from './route-animations';
import { RouterOutlet, ActivatedRoute } from '@angular/router';


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
  @ViewChild('glass', { read: ElementRef }) glass: ElementRef

  constructor() { }
  title = 'EZSAT';
  width: number = window.innerWidth;

  ngAfterViewChecked() {
    if (window.location.pathname === '/home') {
      (this.toolbar.nativeElement as HTMLElement).parentElement.style.backgroundColor = 'transparent';
      (this.footer.nativeElement.parentElement as HTMLElement).classList.add('footerClr');
      (this.bgImg.nativeElement as HTMLElement).style.opacity = '.5';
      (this.glass.nativeElement as HTMLElement).style.opacity = '0';
    } else {
      (this.toolbar.nativeElement as HTMLElement).parentElement.style.backgroundColor = '#1A237E';
      (this.footer.nativeElement.parentElement as HTMLElement).classList.remove('footerClr');
      (this.bgImg.nativeElement as HTMLElement).style.opacity = '1';
      (this.glass.nativeElement as HTMLElement).style.opacity = '.4';
    }

  }
  ngOnInit() {
    window.addEventListener('resize', () => this.width = window.innerWidth);
  }


  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }


}
