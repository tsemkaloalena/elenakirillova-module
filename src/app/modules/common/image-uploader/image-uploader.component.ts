import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {AdminService} from "../../../service/admin.service";
import {ArtworkContainer} from "../../admin-panel/edit-artwork/edit-artwork.component";
import {catchError, map} from "rxjs";
import {ErrorUtilService} from "../../../service/error.util.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {ProgressBarComponent} from "../progress-bar/progress-bar.component";

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  standalone: false
})
export class ImageUploaderComponent implements OnInit {
  @Input() artworkContainer!: ArtworkContainer;
  @Output() updateArtwork = new EventEmitter<any>();
  private uploadProgress = 0.0;
  file?: any;

  constructor(private adminService: AdminService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  onFileUploaded(event: any) {
    const file: File = event.target.files[0];
    if (!!file) {
      const formData = new FormData();
      formData.append('file', file);
      const progressModalRef = this.modalService.open(ProgressBarComponent);
      this.adminService.uploadImage(this.artworkContainer.artwork.id, formData).pipe(
        map(httpEvent => {
          if (!!httpEvent) {
            if (httpEvent.type == HttpEventType.UploadProgress) {
              this.uploadProgress =  Math.round(100 * (httpEvent.loaded / (httpEvent.total || 1)));
            } else if (httpEvent.type === HttpEventType.ResponseHeader) {
              progressModalRef.close();
            } else if (httpEvent.type === HttpEventType.Response && !!httpEvent.body) {
              this.artworkContainer.artwork = httpEvent.body;
            }
          } else {
            progressModalRef.close();
            ErrorUtilService.processError({
              message: 'Не удалось загрузить фотографию. Необходимо обратиться к разработчику с претензией'
            }, this.modalService);
          }
        }),
        map(() => {
          this.updateArtwork.emit();
        }),
        catchError((err) => {
          progressModalRef.close();
          return ErrorUtilService.processError(err, this.modalService);
        })
      ).subscribe();
    }
  }
}
