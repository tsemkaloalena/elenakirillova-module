import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {HomePageComponent} from "./modules/home-page/home-page.component";
import {NotFoundErrorComponent} from "./modules/not-found-error/not-found-error.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/app/home',
    pathMatch: 'full'
  },
  {
    path: 'app',
    children: [
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
    RouterModule.forRoot(routes, {useHash: true, enableTracing: false})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
