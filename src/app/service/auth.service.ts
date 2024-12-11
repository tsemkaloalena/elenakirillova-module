import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthData} from "../model/AuthData";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(protected http: HttpClient) {
  }

  public login(auth: AuthData): Observable<any> {
    return this.http.post('/api/auth/login', auth);
  }

  public checkAuth() {
    return this.http.get('/api/auth/checkAuth');
  }
}
