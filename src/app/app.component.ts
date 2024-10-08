import {AfterContentChecked, AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {slide} from "./route-animations";
import {Router, RouterOutlet} from "@angular/router";
import {LoginService} from "./SERVICES/login.service";
import {Observable} from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [slide]
})
export class AppComponent
  implements OnInit, AfterViewChecked, AfterContentChecked {
  @ViewChild("toolbar", { read: ElementRef }) toolbar: ElementRef;
  @ViewChild("footer", { read: ElementRef }) footer: ElementRef;
  @ViewChild("bgImg", { read: ElementRef }) bgImg: ElementRef;

  fireUser$: Observable<any>;
  bgcSrc = "../assets/TloStronyEGC.png";
  previousScrollPos = 5000;
  scrollLock: boolean = false;
  router: Router
  constructor(
    private loginSv: LoginService,
    router: Router,
  ) {
    this.router = router
    this.fireUser$ = this.loginSv.islogged;
  }

  width: number = window.innerWidth;
  location: string;

  ngAfterContentChecked() {
    if (this.router.url != "/about") this.bgcSrc = "../assets/TloStronyEGC.png";
    else this.bgcSrc = "../assets/o-nas.png";
  }

  ngAfterViewChecked() {
    this.location = window.location.pathname;
    if (window.location.pathname === "/home" || window.location.pathname === "/about") {
      (this.toolbar.nativeElement as HTMLElement).parentElement.style.backgroundColor = "transparent";
      // (this.toolbar.nativeElement as HTMLElement).parentElement.style.position = 'fixed';
      (this.footer.nativeElement.parentElement as HTMLElement).classList.add("footer-on-home");
      (this.bgImg.nativeElement as HTMLElement).style.opacity = ".7";
    } else {
      (this.toolbar.nativeElement as HTMLElement).parentElement.style.backgroundColor = "#030a13";
      // (this.toolbar.nativeElement as HTMLElement).parentElement.style.position = 'static';
      (this.footer.nativeElement.parentElement as HTMLElement).classList.remove("footer-on-home");
      (this.bgImg.nativeElement as HTMLElement).style.opacity = "1";
    }
  }
  ngOnInit() {
    window.addEventListener("resize", () => (this.width = window.innerWidth));
  }
  ngOnDestroy() { }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData["animation"]
    );
  }

  logout() {
    this.loginSv.logout();
  }
}
