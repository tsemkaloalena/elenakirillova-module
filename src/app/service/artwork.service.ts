import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Artwork} from "../model/Artwork";
import {Observable} from "rxjs";
import {ArtworkType} from "../model/ArtworkType";
import {ArtworkSection} from "../model/ArtworkSection";

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  constructor(protected http: HttpClient) {
  }

  getById(id: string): Observable<Artwork | null> {
    return this.http.get<Artwork | null>(`/api/artworks/getById/${id}`);
  }

  getArtworkTypes(): Observable<ArtworkType[]> {
    return this.http.get<ArtworkType[]>(`/api/artworks/getTypes`);
  }

  getArtworkSections(): Observable<ArtworkSection[]> {
    return this.http.get<ArtworkSection[]>(`/api/artworks/getAllSections`);
  }

  getArtworksByType(artworkTypeId: string): Observable<Artwork[]> {
    return this.http.get<Artwork[]>(`/getArtworksByType/${artworkTypeId}`);
  }

  getArtworksBySection(artworkSectionId: string): Observable<Artwork[]> {
    return this.http.get<Artwork[]>(`/getArtworksBySection/${artworkSectionId}`);
  }
}
