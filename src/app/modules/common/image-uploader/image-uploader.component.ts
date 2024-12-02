import {Component, Input, OnInit} from "@angular/core";
import {AdminService} from "../../../service/admin.service";
import {ArtworkContainer} from "../../admin-panel/edit-artwork/edit-artwork.component";
import {catchError, map, NEVER} from "rxjs";
import {ErrorUtilService} from "../../../service/error.util.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  standalone: false
})
export class ImageUploaderComponent implements OnInit {
  @Input() artworkContainer!: ArtworkContainer;

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
        map(updatedArtwork => {
          if (!!updatedArtwork) {
            this.artworkContainer.artwork = updatedArtwork;
          } else {

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
