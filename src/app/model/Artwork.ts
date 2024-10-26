import {ArtworkLangInfo} from "./ArtworkLangInfo";
import {ArtworkType} from "./enums/ArtworkType";
import {ArtworkSection} from "./ArtworkSection";
import {Language} from "./enums/Language";

export class Artwork {
  id: string;
  artworkType: ArtworkType = ArtworkType.PICTURE;
  artworkSection: ArtworkSection;
  numOrder: number;
  show: boolean;
  weight: number;
  creationDate: string;
  creationDateTemp: Date;
  artworkLangInfoList: ArtworkLangInfo[] = [];
  images: string[] = [];
  video: string;

  constructor() {
    Object.keys(Language).forEach(lang => {
      this.artworkLangInfoList.push(new ArtworkLangInfo(this, Language[lang]));
    });
  }
}
