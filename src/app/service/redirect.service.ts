import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  public get404Url(): string {
    return 'app/not-found-error';
  }
}
