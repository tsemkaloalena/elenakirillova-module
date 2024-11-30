import {Component, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: 'app-labeled-field',
  templateUrl: './labeled-field.component.html',
  styleUrls: ['./labeled-field.component.scss'],
  standalone: false
})
export class LabeledFieldComponent implements OnInit {
  @Input() label: string = '';
  @Input() required: boolean = false;

  requiredFieldLabel = 'Это поля обязательно для заполнения';

  ngOnInit(): void {
  }
}
