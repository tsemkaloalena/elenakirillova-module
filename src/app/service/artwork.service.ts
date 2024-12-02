import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Artwork} from "../model/Artwork";
import {Observable, of} from "rxjs";
import {ArtworkType} from "../model/ArtworkType";
import {Language} from "../model/enums/Language";
import {ArtworkSection} from "../model/ArtworkSection";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

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
  return of([
      {id: '1', artworkTypeLangInfoList: [{typeName: 'картины 1', language: Language.RUS, visible: true, visibleInPricelist: true}, {typeName: 'картины 2', language: Language.ENG, visible: true, visibleInPricelist: true}]},
      {id: '2', artworkTypeLangInfoList: [{typeName: 'скульптура 1', language: Language.RUS, visible: true, visibleInPricelist: true}, {typeName: 'скульптура 2', language: Language.ENG, visible: true, visibleInPricelist: true}]},
    ]);
    // TODO return this.http.get<ArtworkType[]>(`/api/artworks/getTypes`);
  }

  getArtworkSections(artworkTypeId: string): Observable<ArtworkSection[]> {
    return of([
      {artworkSectionLangInfos: [{sectionName: 'a1', language: Language.RUS, visible: true, visibleInPricelist: true}, {sectionName: 'a2', language: Language.ENG, visible: true, visibleInPricelist: true}]},
      {artworkSectionLangInfos: [{sectionName: 'b1', language: Language.RUS, visible: true, visibleInPricelist: true}, {sectionName: 'b2', language: Language.ENG, visible: true, visibleInPricelist: true}]}
    ]);
    // TODO return this.http.get<ArtworkSection[]>(`/api/artworks/getSectionsByType/${artworkTypeId}`);
  }

  getArtworksByType(artworkTypeId: string): Observable<Artwork[]> {
    return this.http.get<Artwork[]>(`/getArtworksByType/${artworkTypeId}`);
  }

  getArtworksBySection(artworkSectionId: string): Observable<Artwork[]> {
    return this.http.get<Artwork[]>(`/getArtworksBySection/${artworkSectionId}`);
  }
}
