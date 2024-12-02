import {Component, Input, OnInit, TemplateRef} from "@angular/core";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

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
  @Input() assuranceTitle?: string;
  @Input() assuranceText?: string;
  @Input() assuranceOkButtonText?: string;
  @Input() assuranceCancelButtonText?: string;
  @Input() needAssuranceOnOkButton?: boolean = false;
  @Input() needAssuranceOnCancelButton?: boolean = false;

  constructor(public activeModal: NgbActiveModal,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  continue() {
    if (this.needAssuranceOnOkButton) {
      const assuranceModalRef = this.modalService.open(CustomModalComponent);
      assuranceModalRef.componentInstance.title = this.assuranceTitle;
      assuranceModalRef.componentInstance.text = this.assuranceText;
      assuranceModalRef.componentInstance.okButtonText = this.assuranceOkButtonText;
      assuranceModalRef.componentInstance.cancelButtonText = this.assuranceCancelButtonText;
      assuranceModalRef.result.then((res) => {
        if (res) {
          this.close(true);
        }
      });
    } else {
      this.close(true);
    }
  }

  cancel() {
    if (this.needAssuranceOnCancelButton) {
      const assuranceModalRef = this.modalService.open(CustomModalComponent);
      assuranceModalRef.componentInstance.text = this.assuranceText;
      assuranceModalRef.componentInstance.okButtonText = this.assuranceOkButtonText;
      assuranceModalRef.componentInstance.cancelButtonText = this.assuranceCancelButtonText;
      assuranceModalRef.result.then((res) => {
        if (res) {
          this.close(false);
        }
      });
    } else {
      this.close(false);
    }
  }

  close(value: any) {
    this.activeModal.close(value);
  }
}
