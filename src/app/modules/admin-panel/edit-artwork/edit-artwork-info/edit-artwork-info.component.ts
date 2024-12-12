import {Component, Input, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {Artwork} from "../../../../model/Artwork";
import {Language} from "../../../../model/enums/Language";
import {ArtworkType} from "../../../../model/ArtworkType";
import {ArtworkSection} from "../../../../model/ArtworkSection";
import {ActivatedRoute} from "@angular/router";
import {ArtworkService} from "../../../../service/artwork.service";
import {RedirectService} from "../../../../service/redirect.service";
import {LanguageService} from "../../../../service/language.service";
import {catchError, map, Observable, of, switchMap} from "rxjs";
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

  artworkTypes: ArtworkType[] = [];
  artworkSections: ArtworkSection[] = [];
  @Input() isLoading: boolean = false;
  title: string = '';

  constructor(private route: ActivatedRoute,
              private artworkService: ArtworkService,
              private redirectService: RedirectService,
              protected languageService: LanguageService,
              private modalService: NgbModal) {
  }

  get artwork() {
    return this.artworkContainer.artwork;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.initTitle();
    this.artworkService.getArtworkTypes().pipe(
      map(types => {
        this.artworkTypes = types;
        this.isLoading = false;
      }),
      catchError((err) => {
        this.isLoading = false;
        return ErrorUtilService.processError(err, this.modalService);
      })
    ).subscribe();
  }

  private initTitle() {
    if (this.artworkContainer.isNew) {
      this.title = 'Новая работа';
    } else {
      this.title = 'Редактирование работы';
    }
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

  compareById(type1: any, type2: any): boolean {
    return !!type1.id && !!type2.id && type1.id === type2.id;
  }
}
