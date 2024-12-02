import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ArtworkSection} from "../model/ArtworkSection";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArtworkSectionService {
  constructor(protected http: HttpClient) {
  }

  public deleteArtworkSection(artworkSectionId: string) {
    return this.http.delete(`/api/admin/artworkSection/${artworkSectionId}/delete`);
  }

  public createNewArtworkSection(artworkSection?: ArtworkSection): Observable<ArtworkSection> {
    return this.http.post<ArtworkSection>('/api/admin/artworkSection/createNew', artworkSection);
  }

  public updateArtworkSection(artworkSection?: ArtworkSection): Observable<ArtworkSection> {
    return this.http.post<ArtworkSection>('/api/admin/artworkSection/update', artworkSection);
  }
}
