import {Artwork} from "./Artwork";
import {ArtworkSectionLangInfo} from "./ArtworkSectionLangInfo";
import {Language} from "./enums/Language";
import {ArtworkTypeLangInfo} from "./ArtworkTypeLangInfo";
import getAllLanguages = Language.getAllLanguages;

export class ArtworkSection {
  id?: string;
  numOrder?: number;
  artworkSectionLangInfos: ArtworkSectionLangInfo[] = [];

  constructor() {
    ArtworkSection.initLangInfoList(this);
  }

  public static initLangInfoList(section: ArtworkSection) {
    getAllLanguages().forEach((lang: Language) => {
      section.artworkSectionLangInfos!.push(new ArtworkSectionLangInfo(lang));
    });
  }
}
