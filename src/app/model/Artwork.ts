import {ArtworkLangInfo} from "./ArtworkLangInfo";

import {ArtworkSection} from "./ArtworkSection";
import {Language} from "./enums/Language";
import {ArtworkType} from "./ArtworkType";
import getAllLanguages = Language.getAllLanguages;

export class Artwork {
  id?: string;
  artworkType?: ArtworkType;
  artworkSection: ArtworkSection | null = null;
  numOrder?: number;
  weight?: number;
  // creationDate?: string;
  creationDate?: Date;
  artworkLangInfoList: ArtworkLangInfo[] = [];
  images: string[] = [];
  video?: string;

  constructor() {
    Artwork.initLangInfoList(this);
  }

  public static initLangInfoList(artwork: Artwork) {
    getAllLanguages().forEach((lang: Language) => {
      artwork.artworkLangInfoList!.push(new ArtworkLangInfo(lang));
    });
  }
}
