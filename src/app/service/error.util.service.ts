import {Injectable} from "@angular/core";
import {CustomModalComponent} from "../modules/common/custom-modal/custom-modal.component";
import {NEVER} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: 'root'
})

export class ErrorUtilService {
  public static processError(err: any, modalService: NgbModal) {
    console.log(err);
    if (err.status === 401) {
      // TODO login
    }
    const modalRef = modalService.open(CustomModalComponent);
    modalRef.componentInstance.text = err.message;
    modalRef.componentInstance.okButtonText = 'Понятно';
    modalRef.componentInstance.cancelButtonText = null;
    return NEVER;
  }
}
