import {Component, OnInit} from "@angular/core";
import {AuthData} from "../../../model/AuthData";
import {AdminService} from "../../../service/admin.service";
import {catchError, map, NEVER} from "rxjs";
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  authData: AuthData = {
    username: '',
    password: ''
  };
  errorText: string | null = null;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  login() {
    this.errorText = null;
    if (this.validateAuthData()) {
      this.isLoading = true;
      this.authService.login(this.authData).pipe(
        map(() => {
          // TODO redirect
          this.isLoading = false;
        }),
        catchError(err => {
          this.isLoading = false;
          if (err.status === 403) {
            if (err.error === 'During authorization an error was caught: Wrong password') {
              this.errorText = 'Указан неверный пароль';
            } else {
              this.errorText = 'Указан неверный логин';
            }
          } else {
            this.errorText = err.message;
          }
          return NEVER;
        })
      ).subscribe();
    }
  }

  validateAuthData(): boolean {
    if (!this.authData || !this.authData?.username || this.authData?.username === '') {
      this.errorText = 'Необходимо ввести логин';
      return false;
    }
    if (!this.authData || !this.authData?.username || this.authData?.username === '') {
      this.errorText = 'Необходимо ввести пароль';
      return false;
    }
    return true;
  }
}
