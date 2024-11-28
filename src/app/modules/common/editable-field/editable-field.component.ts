import {Component, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: 'app-editable-field',
  templateUrl: './editable-field.component.html',
  styleUrls: ['./editable-field.component.scss'],
  standalone: false
})
export class EditableFieldComponent implements OnInit {
  @Input() label: string = '';
  @Input() required: boolean = false;

  requiredFieldLabel = 'Это поля обязательно для заполнения';

  ngOnInit(): void {
  }
}
