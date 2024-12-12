import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../../service/auth.service";
import {catchError, NEVER} from "rxjs";
import {RedirectService} from "../../../service/redirect.service";

@Component({template: ''})
export abstract class BaseAdminPageComponent implements OnInit {
  protected constructor(protected authService: AuthService,
                        protected redirectService: RedirectService) {
  }

  ngOnInit(): void {
    this.authService.checkAuth().pipe(
      catchError(err => {
        this.redirectService.redirectToLoginPage();
        return NEVER;
      })
    ).subscribe();
  }
}
