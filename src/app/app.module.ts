import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {HomePageComponent} from "./modules/home-page/home-page.component";
import {AppRoutingModule} from "./app-routing.config";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NotFoundErrorComponent} from "./modules/not-found-error/not-found-error.component";
import {AdminModule} from "./modules/admin-panel/admin.module";
import {provideHttpClient} from "@angular/common/http";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule
  ],
  declarations: [
    AppComponent,
    HomePageComponent,
    NotFoundErrorComponent
  ],
  providers: [
    provideHttpClient()
  ],
  exports: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class ArtworkSite {
}
