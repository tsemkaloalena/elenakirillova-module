import {AbstractType, Component, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Artwork} from "../../../model/Artwork";
import {ArtworkService} from "../../../service/artwork.service";
import {map, Observable, of, switchMap} from "rxjs";
import {RedirectService} from "../../../service/redirect.service";
import {Language} from "../../../model/enums/Language";
import {ArtworkLangInfo} from "../../../model/ArtworkLangInfo";
import {ArtworkType} from "../../../model/ArtworkType";
import {LanguageService} from "../../../service/language.service";
import {ArtworkSection} from "../../../model/ArtworkSection";

@Component({
  selector: 'app-edit-artwork',
  templateUrl: './edit-artwork.component.html',
  styleUrls: ['./edit-artwork.component.scss'],
  standalone: false
})
export class EditArtworkComponent implements OnInit {
  artworkContainer = new ArtworkContainer();
  currentStep = 0;

  ngOnInit(): void {
  }

  nextPage() {
    this.currentStep++;
  }

  previousPage() {
    this.currentStep--;
  }

  save() {
    console.log(this.artworkContainer);
  }

}

export class ArtworkContainer {
  artwork: Artwork;

  constructor() {
    this.artwork = new Artwork()
  }
}
