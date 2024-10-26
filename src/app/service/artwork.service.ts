import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Artwork} from "../model/Artwork";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  constructor(protected http: HttpClient) {
  }

  getById(id: string): Observable<Artwork | null> {
    return this.http.get<Artwork | null>(`/api/artworks/getById/${id}`);
  }
}
