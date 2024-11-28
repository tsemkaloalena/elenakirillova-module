import {ArtworkLangInfo} from "./ArtworkLangInfo";

import {ArtworkSection} from "./ArtworkSection";
import {getAllLanguages, Language} from "./enums/Language";
import {ArtworkType} from "./ArtworkType";

export class Artwork {
  id?: string;
  artworkType?: ArtworkType;
  artworkSection?: ArtworkSection;
  numOrder?: number;
  weight?: number;
  creationDate?: string;
  creationDateTemp?: Date;
  artworkLangInfoList?: ArtworkLangInfo[] = [];
  images?: string[] = [];
  video?: string;

  constructor() {
    this.artworkLangInfoList = [];
    Artwork.initLangInfoList(this);
  }

  public static initLangInfoList(artwork: Artwork) {
    getAllLanguages().forEach((lang: Language) => {
      artwork.artworkLangInfoList!.push(new ArtworkLangInfo(lang));
    });
  }
}
