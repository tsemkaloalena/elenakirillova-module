import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'app-editable-field',
  templateUrl: './editable-field.component.html',
  styleUrls: ['./editable-field.component.scss']
})
export class EditableFieldComponent implements OnInit {
  @Input() label: string = '';

  ngOnInit(): void {
  }

}
