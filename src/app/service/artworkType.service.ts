import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";
import {ArtworkType} from "../model/ArtworkType";

@Injectable({
  providedIn: 'root'
})
export class ArtworkTypeService {
  constructor(protected http: HttpClient) {
  }

  public deleteArtworkType(artworkTypeId: string) {
    return this.http.delete(`/api/admin/artworkType/${artworkTypeId}/delete`);
  }

  public createNewArtworkType(artworkType?: ArtworkType): Observable<ArtworkType> {
    return this.http.post<ArtworkType>('/api/admin/artworkType/createNew', artworkType);
  }

  public updateArtworkType(artworkType?: ArtworkType): Observable<ArtworkType> {
    return this.http.post<ArtworkType>('/api/admin/artworkType/update', artworkType);
  }
}
