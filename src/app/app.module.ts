import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {HomePageComponent} from "./modules/home-page/home-page.component";
import {AppRoutingModule} from "./app-routing.config";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HomePageComponent,
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
