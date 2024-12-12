import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {HomePageComponent} from "./modules/home-page/home-page.component";
import {NotFoundErrorComponent} from "./modules/not-found-error/not-found-error.component";
import {AdminModule} from "./modules/admin-panel/admin.module";
import {EditArtworkComponent} from "./modules/admin-panel/edit-artwork/edit-artwork.component";
import {LoginComponent} from "./modules/admin-panel/login/login.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      {
        path: 'admin',
        children: [
          {
            path: 'edit-artwork',
            component: EditArtworkComponent
          },
          {
            path: 'login',
            component: LoginComponent
          }
        ]
      },
      {
        path: 'home',
        component: HomePageComponent
      }
    ]
  },
  {
    path: '**',
    component: NotFoundErrorComponent
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: false, enableTracing: false})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
