import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {LabeledFieldComponent} from "./editable-field/labeled-field.component";
import {FormsModule} from "@angular/forms";
import {ImageUploaderComponent} from "./image-uploader/image-uploader.component";
import {CustomModalComponent} from "./custom-modal/custom-modal.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {LoadingScreenModalComponent} from "./loading-screen-modal/loading-screen-modal.component";
import {ProgressBarComponent} from "./progress-bar/progress-bar.component";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    LabeledFieldComponent,
    ImageUploaderComponent,
    CustomModalComponent,
    LoadingScreenModalComponent,
    ProgressBarComponent
  ],
  providers: [],
  exports: [
    HeaderComponent,
    FooterComponent,
    LabeledFieldComponent,
    ImageUploaderComponent,
    CustomModalComponent,
    LoadingScreenModalComponent,
    ProgressBarComponent
  ],
  bootstrap: []
})
export class CommonModule {
}
