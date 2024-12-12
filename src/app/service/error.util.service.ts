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
    if (!!err.status && err.status === 401) {
      // TODO login
    }
    const modalRef = modalService.open(CustomModalComponent);
    modalRef.componentInstance.text = err.message;
    if (!!err.error?.message) {
      modalRef.componentInstance.text = err.error.message;
    }
    if (!!err.status && err.status === 500) {
      if (!!err.error.message && !!err.error.error) {
        modalRef.componentInstance.text = `${err.error.message}\n${err.error.error}`;
      } else {
        modalRef.componentInstance.text = `${err.message}\n${err.error}`;
      }
    }
    modalRef.componentInstance.okButtonText = 'Понятно';
    modalRef.componentInstance.cancelButtonText = null;
    return NEVER;
  }
}
