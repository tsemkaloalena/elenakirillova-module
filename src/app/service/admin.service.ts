import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Artwork} from "../model/Artwork";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(protected http: HttpClient,
              private modalService: NgbModal) {
  }

  public createNewArtwork(artwork?: Artwork): Observable<Artwork> {
    return this.http.post<Artwork>('/api/admin/artwork/createNew', artwork);
  }

  public updateArtwork(artwork?: Artwork): Observable<Artwork> {
    return this.http.post<Artwork>('/api/admin/artwork/update', artwork);
  }

  public uploadImage(artworkId?: string, formData?: FormData): Observable<Artwork | null> {
    if (!!artworkId && !!formData) {
      return this.http.post<Artwork>(`/api/admin/artwork/${artworkId}/uploadImage`, formData);
    }
    return of(null);
  }
}
