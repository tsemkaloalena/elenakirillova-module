import {Component, Input, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {ArtworkType} from "../../../../model/ArtworkType";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomModalComponent} from "../../../common/custom-modal/custom-modal.component";
import {LanguageService} from "../../../../service/language.service";
import {ArtworkTypeLangInfo} from "../../../../model/ArtworkTypeLangInfo";
import {ArtworkService} from "../../../../service/artwork.service";
import {catchError, forkJoin, map, NEVER, Observable} from "rxjs";
import {ArtworkTypeService} from "../../../../service/artworkType.service";
import {ErrorUtilService} from "../../../../service/error.util.service";
import {Language} from "../../../../model/enums/Language";

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
  typesToEdit: ArtworkType[] = [];
  isLoading = false;

  constructor(private modalService: NgbModal,
              protected languageService: LanguageService,
              private artworkService: ArtworkService,
              private artworkTypeService: ArtworkTypeService) {
  }

  ngOnInit(): void {
  }

  openModal(): void {
    this.observables = [];
    this.typesToCreate = [];
    const modalRef = this.modalService.open(CustomModalComponent);
    modalRef.componentInstance.title = 'Типы работ';
    modalRef.componentInstance.contentBlock = this.typesModalContent;
    modalRef.componentInstance.okButtonText = 'Сохранить изменения';
    modalRef.componentInstance.cancelButtonText = 'Отмена';
    modalRef.result.then((res) => {
      if (res) {
        this.isLoading = true;
        this.observables.push(
          // save from typesToCreate
        );
        forkJoin(this.observables).pipe(
          map(() => {
            this.isLoading = false;
          })
        ).subscribe();
      } else {
        this.observables = [];
      }
    });
  }

  protected getAllLanguagesInfo(artworkType: ArtworkType): (string | undefined)[] {
    return artworkType.artworkTypeLangInfoList
      .sort((t1: ArtworkTypeLangInfo, t2: ArtworkTypeLangInfo) => t1.language.localeCompare(t2.language))
      .map(type => type.typeName);
  }

  createNewType() {
    this.typesToCreate.push(new ArtworkType());
    const modalRef = this.modalService.open(CustomModalComponent);
    modalRef.componentInstance.title = 'Создать новый';
    modalRef.componentInstance.contentBlock = this.editTypeModal;
    modalRef.componentInstance.okButtonText = 'Сохранить';
    modalRef.componentInstance.cancelButtonText = 'Отмена';
    modalRef.result.then((res) => {
      if (!res) {
        this.typesToCreate.splice(this.typesToCreate.length - 1, 1);
      }
    });
  }

  editType(artworkType: ArtworkType) {

  }

  editNewType(editIndex: number) {

  }

  deleteType(artworkType: ArtworkType) {
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

  deleteNewType(deleteIndex: number) {
    this.typesToCreate.splice(deleteIndex, 1);
  }
}
