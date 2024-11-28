import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {EditableFieldComponent} from "./editable-field/editable-field.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    EditableFieldComponent
  ],
  providers: [],
  exports: [
    HeaderComponent,
    FooterComponent,
    EditableFieldComponent
  ],
  bootstrap: []
})
export class CommonModule {
}
