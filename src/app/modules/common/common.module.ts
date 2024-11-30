import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {LabeledFieldComponent} from "./editable-field/labeled-field.component";
import {FormsModule} from "@angular/forms";
import {ImageUploaderComponent} from "./image-uploader/image-uploader.component";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    LabeledFieldComponent,
    ImageUploaderComponent
  ],
  providers: [],
  exports: [
    HeaderComponent,
    FooterComponent,
    LabeledFieldComponent,
    ImageUploaderComponent
  ],
  bootstrap: []
})
export class CommonModule {
}
