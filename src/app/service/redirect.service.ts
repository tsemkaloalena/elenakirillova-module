import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  public get404Url(): string {
    return '/app/not-found-error';
  }

  public getAdminArtworkUrl(artworkId: string, step: number) {
    return `/app/admin/artwork/${artworkId}/edit/${step}`;
  }

  public getAdminArtworkCatalogUrl() {
    return '';
  }

  public getLoginPage() {
    return '/#/app/admin/login';
  }
}
