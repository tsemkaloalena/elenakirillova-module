import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {ArtworkSite} from "./app/app.module";

// bootstrapApplication(AppComponent)
//   .catch((err) => console.error(err));

platformBrowserDynamic().bootstrapModule(ArtworkSite);
