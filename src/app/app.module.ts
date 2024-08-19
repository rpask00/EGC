import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {AllMaterialModule} from "./all-material.module";
import {HomeComponent} from "./home/home.component";
import {InfoComponent} from "./info/info.component";
import {NewsComponent} from "./news/news.component";
import {ContactComponent} from "./contact/contact.component";
import {RouterModule, Routes} from "@angular/router";
import {AngularFireModule} from "@angular/fire";
import {environment} from "src/environments/environment";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {HttpClientModule} from "@angular/common/http";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GalleryComponent} from "./gallery/gallery.component";
import {DialogComponent} from "./gallery/dialog/dialog.component";
import {MAT_DIALOG_DEFAULT_OPTIONS} from "@angular/material/dialog";
import {LandscapeComponent} from "./gallery/landscape/landscape.component";
import {ScheduleComponent} from "./schedule/schedule.component";
import {AgmCoreModule} from "@agm/core";
import {AdminComponent} from "./admin/admin.component";
import {AdminNewsComponent} from "./admin/admin-news/admin-news.component";
import {AdminGalleryComponent} from "./admin/admin-gallery/admin-gallery.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {SignUPComponent} from "./sign-up/sign-up.component";
import {SignupFormComponent} from "./sign-up/signup-form/signup-form.component";
import {SignupSuccedComponent} from "./sign-up/signup-succed/signup-succed.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {RoutesGuard} from "./guards/routes.guard";
import {LoginComponent} from "./admin/login/login.component";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AdminScheduleComponent} from "./admin/admin-schedule/admin-schedule.component";
import {AdminTeamsComponent} from './admin/admin-teams/admin-teams.component';


const appRoutes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    component: HomeComponent,
    data: { animation: "home" },
    pathMatch: "full"
  },
  {
    path: "sign-up-succed",
    component: SignupSuccedComponent,
    pathMatch: "full"
  },
  {
    path: "sign-up-succed/:team",
    component: SignupSuccedComponent,
    pathMatch: "full"
  },
  {
    path: "signup",
    component: SignUPComponent,
    data: { animation: "signup" },
    pathMatch: "full"
  },
  {
    path: "info",
    component: InfoComponent,
    data: { animation: "info" },
    pathMatch: "full"
  },
  {
    path: "contact",
    component: ContactComponent,
    data: { animation: "contact" },
    pathMatch: "full"
  },
  {
    path: "admin",
    component: AdminComponent,
    data: { animation: "admin" },
    pathMatch: "full",
    canActivate: [RoutesGuard]
  },
  {
    path: "news",
    component: NewsComponent,
    data: { animation: "news" },
    pathMatch: "full"
  },
  {
    path: "about",
    component: AboutUsComponent,
    data: { animation: "about" },
    pathMatch: "full"
  },
  {
    path: "schedule",
    component: ScheduleComponent,
    data: { animation: "schedule" },
    pathMatch: "full"
  },
  {
    path: "gallery",
    component: GalleryComponent,
    data: { animation: "gallery" },
    pathMatch: "full"
  },
  {
    path: "gallery/:key",
    component: LandscapeComponent,
    data: { animation: "landscape" },
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent,
    data: { animation: "login" },
    pathMatch: "full"
  },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InfoComponent,
    NewsComponent,
    ContactComponent,
    GalleryComponent,
    DialogComponent,
    LandscapeComponent,
    ScheduleComponent,
    AdminComponent,
    AdminNewsComponent,
    AdminGalleryComponent,
    PageNotFoundComponent,
    SignUPComponent,
    SignupFormComponent,
    SignupSuccedComponent,
    AboutUsComponent,
    LoginComponent,
    AdminScheduleComponent,
    AdminTeamsComponent,
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDNtLpeBuJr69aljVdfAanu9jKo9AGSg30"
    }),
    AllMaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,

    RouterModule.forRoot(
      appRoutes
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
