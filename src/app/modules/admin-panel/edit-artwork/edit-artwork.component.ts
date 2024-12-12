import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Artwork} from "../../../model/Artwork";
import {ArtworkService} from "../../../service/artwork.service";
import {catchError, map, Observable} from "rxjs";
import {RedirectService} from "../../../service/redirect.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomModalComponent} from "../../common/custom-modal/custom-modal.component";
import {AdminService} from "../../../service/admin.service";
import {ErrorUtilService} from "../../../service/error.util.service";
import {BaseAdminPageComponent} from "../base-admin-page/base-admin-page.component";
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-edit-artwork',
  templateUrl: './edit-artwork.component.html',
  styleUrls: ['./edit-artwork.component.scss'],
  standalone: false
})
export class EditArtworkComponent extends BaseAdminPageComponent implements OnInit {
  artworkContainer = new ArtworkContainer();
  currentStep = 0;
  isLoading = false;

  constructor(private modalService: NgbModal,
              private adminService: AdminService,
              private artworkService: ArtworkService,
              private activatedRoute: ActivatedRoute,
              protected override redirectService: RedirectService,
              protected override authService: AuthService) {
    super(authService, redirectService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    const step = this.activatedRoute.snapshot.queryParamMap.get('step');
    if (!!step && !!Number.parseInt(step)) {
      this.currentStep = Number.parseInt(step);
    }
    this.updateArtwork();
  }

  protected updateArtwork() {
    this.isLoading = true;
    const artworkId = this.activatedRoute.snapshot.queryParamMap.get('id');
    this.artworkContainer.isNew = !!artworkId;
    if (!artworkId) {
      return;
    }
    this.artworkService.getById(artworkId).pipe(
      map(artwork => {
        if (!artwork) {
          this.redirectService.redirectTo404Page();
          return;
        }
        this.artworkContainer.artwork = artwork;
        this.isLoading = false;
      }),
      catchError((err) => {
        this.isLoading = false;
        return ErrorUtilService.processError(err, this.modalService);
      })
    ).subscribe();
  }

  private nextPage() {
    this.currentStep++;
  }

  private previousPage() {
    this.currentStep--;
  }

  private save(): Observable<any> {
    this.isLoading = true;

    // TODO validate empty

    let savingObservable;
    if (!!this.artworkContainer.artwork.id) {
      savingObservable = this.adminService.updateArtwork(this.artworkContainer.artwork);
    } else {
      savingObservable = this.adminService.createNewArtwork(this.artworkContainer.artwork);
    }

    return savingObservable.pipe(
      map(newArtwork => {
        this.isLoading = false;
        if (!!newArtwork?.id) {
          this.artworkContainer.artwork = newArtwork;
        } else {
          ErrorUtilService.processError('Произошла ошибка при сохранении работы', this.modalService);
        }
      }),
      catchError((err) => {
        this.isLoading = false;
        return ErrorUtilService.processError(err, this.modalService);
      })
    );
  }

  goToPhotoLoading() {
    this.save().pipe(
      map(() => {
        if (!!this.artworkContainer.artwork.id) {
          this.nextPage();
          this.redirectService.redirectToAdminArtworkPage(this.artworkContainer.artwork.id, this.currentStep);
        }
      }),
      catchError((err) => {
        this.isLoading = false;
        return ErrorUtilService.processError(err, this.modalService);
      })
    ).subscribe();
  }

  backToInfoEditing() {
    this.previousPage();
    if (!!this.artworkContainer.artwork.id) {
      this.redirectService.redirectToAdminArtworkPage(this.artworkContainer.artwork.id, this.currentStep);
    }
  }

  saveAndExit() {
    if (!this.artworkContainer.artwork.images || this.artworkContainer.artwork.images?.length === 0) {
      const modalRef = this.modalService.open(CustomModalComponent);
      modalRef.componentInstance.text = 'Если не загружена хотя бы одна фотография, работа не будет отображаться в каталоге и прайслисте. Вы точно хотите выйти из режима редактирования?\n\nПродолжить редактирование можно будет позже.';
      modalRef.componentInstance.okButtonText = 'Продолжить редактирование';
      modalRef.componentInstance.cancelButtonText = 'Сохранить и выйти';
      modalRef.result.then((res) => {
        if (!res) {
          this.save().pipe(
            map(() => {
              this.exit();
            }),
            catchError((err) => {
              this.isLoading = false;
              return ErrorUtilService.processError(err, this.modalService);
            })
          ).subscribe();
        }
      });
    }
  }

  exit() {
    this.redirectService.redirectToAdminArtworkCatalogPage();
  }

}

export class ArtworkContainer {
  artwork: Artwork;
  isNew: boolean;

  constructor() {
    this.artwork = new Artwork();
    this.isNew = true;
  }
}
