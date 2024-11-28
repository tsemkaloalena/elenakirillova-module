import {Component, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Artwork} from "../../../model/Artwork";
import {ArtworkService} from "../../../service/artwork.service";
import {map} from "rxjs";
import {RedirectService} from "../../../service/redirect.service";
import {getAllLanguages, Language} from "../../../model/enums/Language";
import {ArtworkLangInfo} from "../../../model/ArtworkLangInfo";

@Component({
  selector: 'app-edit-artwork',
  templateUrl: './edit-artwork.component.html',
  styleUrls: ['./edit-artwork.component.scss'],
  standalone: false
})
export class EditArtworkComponent implements OnInit {
  @ViewChild('artworkInfo') artworkInfo!: TemplateRef<any>;

  isNew: boolean = true;
  artwork!: Artwork;
  languageList = getAllLanguages();
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute,
              private artworkService: ArtworkService,
              private redirectService: RedirectService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    const artworkId = this.route.snapshot.paramMap.get('id');
    if (!!artworkId) {
      this.isNew = false;
      this.artworkService.getById(artworkId).pipe(
        map(artwork => {
          if (!artwork) {
            window.location.href = this.redirectService.get404Url();
            return;
          }
          this.artwork = artwork;
        })
      ).subscribe(() => {
        this.isLoading = false;
      });
    } else {
      this.isNew = true;
      this.artwork = new Artwork();
      this.isLoading = false;
    }
  }

  getInfoByLang(lang: Language): ArtworkLangInfo {
    let infoIndex = this.artwork.artworkLangInfoList?.findIndex(langInfo => langInfo.language === lang);
    if (!infoIndex || infoIndex === -1) {
      infoIndex = 0;
    }
    const artworkLangInfo = this.artwork.artworkLangInfoList?.at(infoIndex);
    if (!artworkLangInfo) {
      Artwork.initLangInfoList(this.artwork);
      return this.getInfoByLang(lang);
    }
    return artworkLangInfo;
  }
}
