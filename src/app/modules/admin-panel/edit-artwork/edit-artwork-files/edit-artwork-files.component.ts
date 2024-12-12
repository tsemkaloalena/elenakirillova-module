import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {ArtworkContainer} from "../edit-artwork.component";
import {ArtworkService} from "../../../../service/artwork.service";
import {catchError, forkJoin, map, Observable, switchMap} from "rxjs";
import {ErrorUtilService} from "../../../../service/error.util.service";
import {Artwork} from "../../../../model/Artwork";
import {ActivatedRoute} from "@angular/router";
import {RedirectService} from "../../../../service/redirect.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-edit-artwork-files',
  templateUrl: './edit-artwork-files.component.html',
  styleUrls: ['./edit-artwork-files.component.scss'],
  standalone: false
})
export class EditArtworkFilesComponent implements OnInit {
  @Input() artworkContainer!: ArtworkContainer;
  @Input() isLoading: boolean = false;
  @Output() updateArtworkEvent = new EventEmitter<any>();
  imageMap = new Map<number, Blob>();

  constructor(private route: ActivatedRoute,
              private artworkService: ArtworkService,
              private redirectService: RedirectService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.updateImages();
  }

  updateArtwork() {
    this.updateArtworkEvent.emit();
  }

  updateImages() {
    if (!this.isLoading) {
      this.isLoading = true;
      const observables: Observable<any>[] = [];
      this.artworkContainer.artwork.images.forEach((imageName, index) => {
        observables.push(this.artworkService.getImage(imageName).pipe(
          map(image => {
            this.imageMap.set(index, image);
          })
        ));
      });
      forkJoin(observables).subscribe(() => {
        this.isLoading = false;
      });
    }
  }
}
