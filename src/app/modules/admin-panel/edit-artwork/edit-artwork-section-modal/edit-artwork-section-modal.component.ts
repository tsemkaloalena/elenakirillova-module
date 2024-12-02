import {Component, Input, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {ArtworkSection} from "../../../../model/ArtworkSection";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomModalComponent} from "../../../common/custom-modal/custom-modal.component";
import {LanguageService} from "../../../../service/language.service";
import {ArtworkSectionLangInfo} from "../../../../model/ArtworkSectionLangInfo";
import {ArtworkService} from "../../../../service/artwork.service";
import {catchError, forkJoin, map, Observable} from "rxjs";
import {ErrorUtilService} from "../../../../service/error.util.service";
import {ArtworkSectionService} from "../../../../service/artworkSection.service";

@Component({
  selector: 'app-edit-artwork-section-modal',
  templateUrl: './edit-artwork-section-modal.component.html',
  styleUrls: ['./edit-artwork-section-modal.component.scss'],
  standalone: false
})
export class EditArtworkSectionModalComponent implements OnInit {
  @ViewChild('sectionsModalContent') sectionsModalContent!: TemplateRef<any>;
  @ViewChild('editSectionModal') editSectionModal!: TemplateRef<any>;
  @Input() artworkSections: ArtworkSection[] = [];
  observables: Observable<any>[] = [];
  sectionsToCreate: ArtworkSection[] = [];
  sectionsToEdit = new Map<string, ArtworkSection>();
  tempArtworkSection: ArtworkSection = new ArtworkSection();
  isLoading = false;

  constructor(private modalService: NgbModal,
              protected languageService: LanguageService,
              private artworkService: ArtworkService,
              private artworkSectionService: ArtworkSectionService) {
  }

  ngOnInit(): void {
  }

  private clearLocalStorage() {
    this.observables = [];
    this.sectionsToCreate = [];
    this.sectionsToEdit = new Map<string, ArtworkSection>();
  }

  openModal(): void {
    this.clearLocalStorage();
    const modalRef = this.modalService.open(CustomModalComponent);
    modalRef.componentInstance.title = 'Серии';
    modalRef.componentInstance.contentBlock = this.sectionsModalContent;
    modalRef.componentInstance.okButtonText = 'Сохранить изменения';
    modalRef.componentInstance.cancelButtonText = 'Отмена';
    modalRef.componentInstance.needAssuranceOnCancelButton = true;
    modalRef.componentInstance.assuranceTitle = 'Удаление несохранённых изменений';
    modalRef.componentInstance.assuranceText = 'При наличии несохранённых изменений Ваше действия будут отменены.';
    modalRef.componentInstance.assuranceOkButtonText = 'Всё равно выйти';
    modalRef.componentInstance.assuranceCancelButtonText = 'Остаться';
    modalRef.result.then((res) => {
      if (res) {
        if (this.observables.length > 0) {
          this.isLoading = true;
          this.setAllObservables();
          forkJoin(this.observables).pipe(
            map(() => {
              this.isLoading = false;
            }),
            catchError((err) => {
              this.isLoading = false;
              return ErrorUtilService.processError(err, this.modalService);
            })
          ).subscribe();
        }
        this.clearLocalStorage();
      }
    });
  }

  private setAllObservables() {
    this.sectionsToCreate.forEach(section => {
      this.observables.push(this.artworkSectionService.createNewArtworkSection(section));
    });
    this.sectionsToEdit.forEach((section, id) => {
      this.observables.push(this.artworkSectionService.updateArtworkSection(section));
    });
  }

  protected getAllLanguagesInfo(artworkSection: ArtworkSection): ArtworkSectionLangInfo[] {
    return artworkSection.artworkSectionLangInfos
      .sort((t1: ArtworkSectionLangInfo, t2: ArtworkSectionLangInfo) => t1.language.localeCompare(t2.language));
  }

  protected createNewSection() {
    this.tempArtworkSection = new ArtworkSection();
    const modalRef = this.modalService.open(CustomModalComponent);
    modalRef.componentInstance.title = 'Создать новый';
    modalRef.componentInstance.contentBlock = this.editSectionModal;
    modalRef.componentInstance.okButtonText = 'Сохранить';
    modalRef.componentInstance.cancelButtonText = 'Отмена';
    modalRef.result.then((res) => {
      if (res) {
        this.sectionsToCreate.push(JSON.parse(JSON.stringify(this.tempArtworkSection)));
      }
    });
  }

  protected editSection(artworkSection: ArtworkSection) {
    this.tempArtworkSection = artworkSection;
    const modalRef = this.modalService.open(CustomModalComponent);
    modalRef.componentInstance.title = 'Редактировать';
    modalRef.componentInstance.contentBlock = this.editSectionModal;
    modalRef.componentInstance.okButtonText = 'Сохранить';
    modalRef.componentInstance.cancelButtonText = 'Отмена';
    modalRef.result.then((res) => {
      if (res) {
        artworkSection = JSON.parse(JSON.stringify(this.tempArtworkSection));
        this.sectionsToEdit.set(artworkSection.id!, this.tempArtworkSection);
      }
    });
  }

  protected editNewSection(editIndex: number) {
    this.tempArtworkSection = this.sectionsToCreate.at(editIndex)!;
    const modalRef = this.modalService.open(CustomModalComponent);
    modalRef.componentInstance.title = 'Редактировать';
    modalRef.componentInstance.contentBlock = this.editSectionModal;
    modalRef.componentInstance.okButtonText = 'Сохранить';
    modalRef.componentInstance.cancelButtonText = 'Отмена';
    modalRef.result.then((res) => {
      if (res) {
        this.sectionsToCreate[editIndex] = JSON.parse(JSON.stringify(this.tempArtworkSection));
      }
    });
  }

  protected deleteSection(artworkSection: ArtworkSection) {
    this.isLoading = true;
    this.artworkService.getArtworksBySection(artworkSection.id!).pipe(
      map(artworkList => {
        this.isLoading = false;
        if (!artworkList || artworkList?.length === 0) {
          this.observables.push(this.artworkSectionService.deleteArtworkSection(artworkSection.id!));
          const deleteIndex = this.artworkSections.findIndex(section => section.id === artworkSection.id);
          this.artworkSections.splice(deleteIndex, 1);
        } else {
          const warnModalRef = this.modalService.open(CustomModalComponent);
          warnModalRef.componentInstance.text = `Данный тип невозможно удалить, ему принадлежат работы ${artworkList.map(a => a.id).join(', ')}. Необходимо сначала заменить их тип на другой.`;
          warnModalRef.componentInstance.okButtonText = 'Понятно';
        }
      }), catchError((err) => {
        this.isLoading = false;
        return ErrorUtilService.processError(err, this.modalService);
      })
    ).subscribe();
  }

  protected deleteNewSection(deleteIndex: number) {
    this.sectionsToCreate.splice(deleteIndex, 1);
  }
}
