import {Component, Input, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {Artwork} from "../../../../model/Artwork";
import {Language} from "../../../../model/enums/Language";
import {ArtworkType} from "../../../../model/ArtworkType";
import {ArtworkSection} from "../../../../model/ArtworkSection";
import {ActivatedRoute} from "@angular/router";
import {ArtworkService} from "../../../../service/artwork.service";
import {RedirectService} from "../../../../service/redirect.service";
import {LanguageService} from "../../../../service/language.service";
import {catchError, map, Observable, switchMap} from "rxjs";
import {ArtworkContainer} from "../edit-artwork.component";
import {EditArtworkTypeModalComponent} from "../edit-artwork-type-modal/edit-artwork-type-modal.component";
import {ErrorUtilService} from "../../../../service/error.util.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EditArtworkSectionModalComponent} from "../edit-artwork-section-modal/edit-artwork-section-modal.component";

@Component({
  selector: 'app-edit-artwork-info',
  templateUrl: './edit-artwork-info.component.html',
  styleUrls: ['./edit-artwork-info.component.scss'],
  standalone: false
})
export class EditArtworkInfoComponent implements OnInit {
  @ViewChild('artworkInfo') artworkInfo!: TemplateRef<any>;
  @ViewChild('editArtworkTypeModalComponent') editArtworkTypeModalComponent!: EditArtworkTypeModalComponent;
  @ViewChild('editArtworkSectionModalComponent') editArtworkSectionModalComponent!: EditArtworkSectionModalComponent;
  @Input() artworkContainer!: ArtworkContainer;

  isNew: boolean = true;
  artworkTypes: ArtworkType[] = [];
  artworkSections: ArtworkSection[] = [];
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute,
              private artworkService: ArtworkService,
              private redirectService: RedirectService,
              protected languageService: LanguageService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    const artworkId = this.route.snapshot.paramMap.get('id');
    let loadInfo = this.artworkService.getArtworkTypes().pipe(
      map(types => {
        this.artworkTypes = types;
      }),
      catchError((err) => {
        this.isLoading = false;
        return ErrorUtilService.processError(err, this.modalService);
      })
    );
    if (!!artworkId) {
      this.isNew = false;
      loadInfo = this.loadArtworkInfo(loadInfo, artworkId);
    } else {
      this.isNew = true;
      this.artworkContainer.artwork = new Artwork();
    }
    loadInfo.subscribe(() => {
      this.isLoading = false;
    });
  }

  get artwork() {
    return this.artworkContainer.artwork;
  }

  private loadArtworkInfo(loadInfo: Observable<any>, artworkId: string) {
    return loadInfo.pipe(
      switchMap(() => {
        return this.artworkService.getById(artworkId);
      }),
      map(artwork => {
        if (!artwork) {
          window.location.href = this.redirectService.get404Url();
          return;
        }
        this.artworkContainer.artwork = artwork;
      }),
      catchError((err) => {
        this.isLoading = false;
        return ErrorUtilService.processError(err, this.modalService);
      })
    );
  }

  getCurrencySymbol = Language.getCurrencySymbol;

  onArtworkTypeChanged() {
    if (!this.artworkContainer.artwork?.artworkType?.id) {
      this.artworkSections = [];
      return;
    }
    this.artworkService.getArtworkSections().pipe(
      map(sections => {
        this.artworkSections = sections;
        if (sections?.length > 0) {
          this.artwork.artworkSection = null;
        }
      }),
      catchError((err) => {
        this.isLoading = false;
        return ErrorUtilService.processError(err, this.modalService);
      })
    ).subscribe();
  }

  onCreateSectionClicked() {
    this.editArtworkSectionModalComponent.openModal();
  }

  onCreateTypeClicked() {
    this.editArtworkTypeModalComponent.openModal();
  }
}
