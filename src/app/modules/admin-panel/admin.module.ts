import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
// import {AdminRoutingConfig} from "./admin-routing.config";
import {EditArtworkComponent} from "./edit-artwork/edit-artwork.component";
import {CommonModule} from "../common/common.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule, provideHttpClient} from "@angular/common/http";
import {EditArtworkInfoComponent} from "./edit-artwork/edit-artwork-info/edit-artwork-info.component";
import {EditArtworkFilesComponent} from "./edit-artwork/edit-artwork-files/edit-artwork-files.component";
import {
  EditArtworkTypeModalComponent
} from "./edit-artwork/edit-artwork-type-modal/edit-artwork-type-modal.component";
import {
  EditArtworkSectionModalComponent
} from "./edit-artwork/edit-artwork-section-modal/edit-artwork-section-modal.component";
import {LoginComponent} from "./login/login.component";
import {BaseAdminPageComponent} from "./base-admin-page/base-admin-page.component";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // AdminRoutingConfig,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    EditArtworkComponent,
    EditArtworkInfoComponent,
    EditArtworkFilesComponent,
    EditArtworkTypeModalComponent,
    EditArtworkSectionModalComponent,
    LoginComponent
  ],
  providers: [
  ],
  exports: [
    EditArtworkComponent,
    EditArtworkInfoComponent,
    EditArtworkFilesComponent,
    EditArtworkTypeModalComponent,
    EditArtworkSectionModalComponent,
    LoginComponent
  ],
  bootstrap: []
})
export class AdminModule {
}
