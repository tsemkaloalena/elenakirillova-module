import {AbstractType, Component, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Artwork} from "../../../model/Artwork";
import {ArtworkService} from "../../../service/artwork.service";
import {catchError, map, Observable, of, switchMap} from "rxjs";
import {RedirectService} from "../../../service/redirect.service";
import {Language} from "../../../model/enums/Language";
import {ArtworkLangInfo} from "../../../model/ArtworkLangInfo";
import {ArtworkType} from "../../../model/ArtworkType";
import {LanguageService} from "../../../service/language.service";
import {ArtworkSection} from "../../../model/ArtworkSection";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomModalComponent} from "../../common/custom-modal/custom-modal.component";
import {AdminService} from "../../../service/admin.service";
import {ErrorUtilService} from "../../../service/error.util.service";

@Component({
  selector: 'app-edit-artwork',
  templateUrl: './edit-artwork.component.html',
  styleUrls: ['./edit-artwork.component.scss'],
  standalone: false
})
export class EditArtworkComponent implements OnInit {
  artworkContainer = new ArtworkContainer();
  currentStep = 0;
  isLoading = false;

  constructor(private modalService: NgbModal,
              private adminService: AdminService,
              private redirectService: RedirectService) {
  }

  ngOnInit(): void {
  }

  private nextPage() {
    this.currentStep++;
  }

  private previousPage() {
    this.currentStep--;
  }

  private save(): Observable<any> {
    this.isLoading = true;
    let savingObservable;
    if (!!this.artworkContainer.artwork.id) {
      savingObservable = this.adminService.updateArtwork(this.artworkContainer.artwork);
    } else {
      savingObservable = this.adminService.createNewArtwork(this.artworkContainer.artwork);
    }

    return savingObservable.pipe(
      map(newArtwork => {
        this.artworkContainer.artwork = newArtwork;
        this.isLoading = false;
      }),
      catchError((err) => {
        this.isLoading = false;
        return ErrorUtilService.processError(err, this.modalService);
      })
    );
  }

  goToPhotoLoading() {

    this.nextPage();
  }

  backToInfoEditing() {

    this.previousPage();
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
    window.location.href = this.redirectService.getAdminArtworkCatalogUrl();
  }

}

export class ArtworkContainer {
  artwork: Artwork;

  constructor() {
    this.artwork = new Artwork()
  }
}
