import {Component, Input, OnInit, TemplateRef} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.scss'],
  standalone: false
})
export class CustomModalComponent implements OnInit {
  @Input() title?: string = "Предупреждение";
  @Input() text?: string;
  @Input() contentBlock?: TemplateRef<any>;
  @Input() okButtonText?: string;
  @Input() cancelButtonText?: string;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

  open() {

  }

  continue() {
    this.activeModal.close(true);
  }

  cancel() {
    this.activeModal.close(false);
  }
}
