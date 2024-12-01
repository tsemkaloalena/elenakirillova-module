import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Artwork} from "../model/Artwork";
import {catchError, Observable, of} from "rxjs";
import {ArtworkType} from "../model/ArtworkType";
import {Language} from "../model/enums/Language";
import {ArtworkSection} from "../model/ArtworkSection";
import {ErrorUtilService} from "./error.util.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  constructor(protected http: HttpClient,
              private modalService: NgbModal) {
  }

  getById(id: string): Observable<Artwork | null> {
    return this.http.get<Artwork | null>(`/api/artworks/getById/${id}`);
  }

  getArtworkTypes(): Observable<ArtworkType[]> {
  return of([
      {id: '1', artworkTypeLangInfoList: [{typeName: 'картины 1', language: Language.RUS}, {typeName: 'картины 2', language: Language.ENG}]},
      {id: '2', artworkTypeLangInfoList: [{typeName: 'скульптура 1', language: Language.RUS}, {typeName: 'скульптура 2', language: Language.ENG}]},
    ]);
    // TODO return this.http.get<ArtworkType[]>(`/api/artworks/getTypes`);
  }

  getArtworkSections(artworkTypeId: string): Observable<ArtworkSection[]> {
    return of([
      {artworkSectionLangInfos: [{sectionName: 'a1', language: Language.RUS}, {sectionName: 'a2', language: Language.ENG}]},
      {artworkSectionLangInfos: [{sectionName: 'b1', language: Language.RUS}, {sectionName: 'b2', language: Language.ENG}]}
    ]);
    // TODO return this.http.get<ArtworkSection[]>(`/api/artworks/getSectionsByType/${artworkTypeId}`);
  }

  getArtworksByType(artworkTypeId: string): Observable<Artwork[]> {
    return this.http.get<Artwork[]>(`/getArtworksByType/${artworkTypeId}`);
  }
}
