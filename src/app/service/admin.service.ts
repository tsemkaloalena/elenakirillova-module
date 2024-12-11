import {Injectable} from "@angular/core";
import {HttpClient, HttpEvent} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Artwork} from "../model/Artwork";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthData} from "../model/AuthData";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(protected http: HttpClient) {
  }

  public createNewArtwork(artwork?: Artwork): Observable<Artwork> {
    return this.http.post<Artwork>('/api/admin/artwork/createNew', artwork);
  }

  public updateArtwork(artwork?: Artwork): Observable<Artwork> {
    return this.http.post<Artwork>('/api/admin/artwork/update', artwork);
  }

  public uploadImage(artworkId?: string, formData?: FormData): Observable<HttpEvent<Artwork> | null> {
    if (!!artworkId && !!formData) {
      return this.http.post<Artwork>(`/api/admin/artwork/${artworkId}/uploadImage`, formData, {
        reportProgress: true,
        observe: 'events'
      });
    }
    return of(null);
  }
}
