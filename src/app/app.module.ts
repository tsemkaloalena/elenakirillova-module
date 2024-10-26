import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {HomePageComponent} from "./modules/home-page/home-page.component";
import {AppRoutingModule} from "./app-routing.config";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NotFoundErrorComponent} from "./modules/not-found-error/not-found-error.component";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HomePageComponent,
    NotFoundErrorComponent
  ],
  providers: [],
  exports: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class ArtworkSite {
}
