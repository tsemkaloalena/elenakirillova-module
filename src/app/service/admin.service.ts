import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, NEVER, Observable, of} from "rxjs";
import {Artwork} from "../model/Artwork";
import {CustomModalComponent} from "../modules/common/custom-modal/custom-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(protected http: HttpClient,
              private modalService: NgbModal) {
  }

  public createNewArtwork(artwork?: Artwork): Observable<Artwork> {
    return this.http.post<Artwork>('/api/admin/createNewArtwork', artwork);
  }

  public updateArtwork(artwork?: Artwork): Observable<Artwork> {
    return this.http.post<Artwork>('/api/admin/updateArtwork', artwork);
  }

  public uploadImage(artworkId?: string, formData?: FormData): Observable<Artwork | null> {
    if (!!artworkId && !!formData) {
      return this.http.post<Artwork>(`/api/admin/artwork/${artworkId}/uploadImage`, formData).pipe(
        catchError((err) => {
          const modalRef = this.modalService.open(CustomModalComponent);
          modalRef.componentInstance.warningText = err;
          modalRef.componentInstance.okButtonText = 'Понятно';
          modalRef.componentInstance.cancelButtonText = null;
          return NEVER;
        })
      );
    }
    return of(null);
  }
}
