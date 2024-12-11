import {Component, Input, OnInit} from "@angular/core";
import {AdminService} from "../../../service/admin.service";
import {ArtworkContainer} from "../../admin-panel/edit-artwork/edit-artwork.component";
import {catchError, map} from "rxjs";
import {ErrorUtilService} from "../../../service/error.util.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpEventType} from "@angular/common/http";
import {ProgressBarComponent} from "../progress-bar/progress-bar.component";

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  standalone: false
})
export class ImageUploaderComponent implements OnInit {
  @Input() artworkContainer!: ArtworkContainer;
  private uploadProgress = 0.0;

  constructor(private adminService: AdminService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  onFileUploaded(event: any) {
    const file: File = event.target.files[0];
    if (!!file) {
      const formData = new FormData();
      formData.append('thumbnail', file);
      this.adminService.uploadImage(this.artworkContainer.artwork.id, formData).pipe(
        map(event => {
          if (!!event) {
            if (event.type == HttpEventType.UploadProgress) {
              this.uploadProgress =  Math.round(100 * (event.loaded / (event.total || 1)));
            }
            const modalRef = this.modalService.open(ProgressBarComponent);
            // TODO this.artworkContainer.artwork = event.body;
          } else {
            ErrorUtilService.processError({
              message: 'Не удалось загрузить фотографию. Необходимо обратиться к разработчику с претензией'
            }, this.modalService);
          }
        }),
        catchError((err) => {
          // this.isLoading = false;
          return ErrorUtilService.processError(err, this.modalService);
        })
      ).subscribe();
    }
  }
  // TODO progress and cancel
}
