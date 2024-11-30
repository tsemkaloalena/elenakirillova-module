import {Component, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.scss'],
  standalone: false
})
export class CustomModalComponent implements OnInit {
  title?: string = "Предупреждение";
  warningText?: string;
  okButtonText?: string;
  cancelButtonText?: string;

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
