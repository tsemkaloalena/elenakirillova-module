import {Component, Input, OnInit, Output} from "@angular/core";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  @Input() progress: number = 0.0;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    if (this.progress  >= 1) {
      this.activeModal.close();
    }
  }

}
