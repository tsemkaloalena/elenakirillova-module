import {Component, Input, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {ArtworkType} from "../../../../model/ArtworkType";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {CustomModalComponent} from "../../../common/custom-modal/custom-modal.component";
import {LanguageService} from "../../../../service/language.service";
import {ArtworkTypeLangInfo} from "../../../../model/ArtworkTypeLangInfo";
import {ArtworkService} from "../../../../service/artwork.service";
import {catchError, forkJoin, map, Observable} from "rxjs";
import {ArtworkTypeService} from "../../../../service/artworkType.service";
import {ErrorUtilService} from "../../../../service/error.util.service";

@Component({
  selector: 'app-edit-artwork-type-modal',
  templateUrl: './edit-artwork-type-modal.component.html',
  styleUrls: ['./edit-artwork-type-modal.component.scss'],
  standalone: false
})
export class EditArtworkTypeModalComponent implements OnInit {
  @ViewChild('typesModalContent') typesModalContent!: TemplateRef<any>;
  @ViewChild('editTypeModal') editTypeModal!: TemplateRef<any>;
  @Input() artworkTypes: ArtworkType[] = [];
  observables: Observable<any>[] = [];
  typesToCreate: ArtworkType[] = [];
  typesToEdit = new Map<string, ArtworkType>();
  tempArtworkType: ArtworkType = new ArtworkType();
  isLoading = false;

  constructor(private modalService: NgbModal,
              protected languageService: LanguageService,
              private artworkService: ArtworkService,
              private artworkTypeService: ArtworkTypeService) {
  }

  ngOnInit(): void {
  }

  private clearLocalStorage() {
    this.observables = [];
    this.typesToCreate = [];
    this.typesToEdit = new Map<string, ArtworkType>();
  }

  openModal(): void {
    this.clearLocalStorage();
    const modalRef = this.modalService.open(CustomModalComponent);
    modalRef.componentInstance.title = 'Типы работ';
    modalRef.componentInstance.contentBlock = this.typesModalContent;
    modalRef.componentInstance.okButtonText = 'Сохранить изменения';
    modalRef.componentInstance.cancelButtonText = 'Отмена';
    modalRef.componentInstance.needAssuranceOnCancelButton = true;
    modalRef.componentInstance.assuranceTitle = 'Удаление несохранённых изменений';
    modalRef.componentInstance.assuranceText = 'При наличии несохранённых изменений Ваше действия будут отменены.';
    modalRef.componentInstance.assuranceOkButtonText = 'Всё равно выйти';
    modalRef.componentInstance.assuranceCancelButtonText = 'Остаться';
    modalRef.result.then((res) => {
      if (res) {
        this.setAllObservables();
        if (this.observables.length > 0) {
          this.isLoading = true;
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
    this.typesToCreate.forEach(type => {
      this.observables.push(this.artworkTypeService.createNewArtworkType(type));
    });
    this.typesToEdit.forEach((type, id) => {
      this.observables.push(this.artworkTypeService.updateArtworkType(type));
    });
  }

  protected getAllLanguagesInfo(artworkType: ArtworkType): ArtworkTypeLangInfo[] {
    return artworkType.artworkTypeLangInfoList
      .sort((t1: ArtworkTypeLangInfo, t2: ArtworkTypeLangInfo) => t1.language.localeCompare(t2.language));
  }

  protected createNewType() {
    this.tempArtworkType = new ArtworkType();
    const modalRef = this.modalService.open(CustomModalComponent);
    modalRef.componentInstance.title = 'Создать новый';
    modalRef.componentInstance.contentBlock = this.editTypeModal;
    modalRef.componentInstance.okButtonText = 'Сохранить';
    modalRef.componentInstance.cancelButtonText = 'Отмена';
    modalRef.result.then((res) => {
      if (res) {
        this.typesToCreate.push(JSON.parse(JSON.stringify(this.tempArtworkType)));
      }
    });
  }

  protected editType(artworkType: ArtworkType) {
    this.tempArtworkType = artworkType;
    const modalRef = this.modalService.open(CustomModalComponent);
    modalRef.componentInstance.title = 'Редактировать';
    modalRef.componentInstance.contentBlock = this.editTypeModal;
    modalRef.componentInstance.okButtonText = 'Сохранить';
    modalRef.componentInstance.cancelButtonText = 'Отмена';
    modalRef.result.then((res) => {
      if (res) {
        artworkType = JSON.parse(JSON.stringify(this.tempArtworkType));
        this.typesToEdit.set(artworkType.id!, this.tempArtworkType);
      }
    });
  }

  protected editNewType(editIndex: number) {
    this.tempArtworkType = this.typesToCreate.at(editIndex)!;
    const modalRef = this.modalService.open(CustomModalComponent);
    modalRef.componentInstance.title = 'Редактировать';
    modalRef.componentInstance.contentBlock = this.editTypeModal;
    modalRef.componentInstance.okButtonText = 'Сохранить';
    modalRef.componentInstance.cancelButtonText = 'Отмена';
    modalRef.result.then((res) => {
      if (res) {
        this.typesToCreate[editIndex] = JSON.parse(JSON.stringify(this.tempArtworkType));
      }
    });
  }

  protected deleteType(artworkType: ArtworkType) {
    this.isLoading = true;
    this.artworkService.getArtworksByType(artworkType.id!).pipe(
      map(artworkList => {
        this.isLoading = false;
        if (!artworkList || artworkList?.length === 0) {
          this.observables.push(this.artworkTypeService.deleteArtworkType(artworkType.id!));
          const deleteIndex = this.artworkTypes.findIndex(type => type.id === artworkType.id);
          this.artworkTypes.splice(deleteIndex, 1);
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

  protected deleteNewType(deleteIndex: number) {
    this.typesToCreate.splice(deleteIndex, 1);
  }
}
