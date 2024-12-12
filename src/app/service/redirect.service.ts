import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  public redirectTo404Page() {
    this.redirect('/not-found-error');
  }

  public redirectToAdminArtworkPage(artworkId: string, step: number) {
    this.redirect(`/admin/edit-artwork?id=${artworkId}&step=${step}`);
  }

  public redirectToAdminNewArtworkPage() {
    this.redirect('/admin/edit-artwork');
  }

  public redirectToAdminArtworkCatalogPage() {
    this.redirect('');
  }

  public redirectToLoginPage() {
    this.redirect('/admin/login');
  }

  private redirect(page: string) {
    window.location.href = page;
  }
}
