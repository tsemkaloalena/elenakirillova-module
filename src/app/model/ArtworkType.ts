import {ArtworkTypeLangInfo} from "./ArtworkTypeLangInfo";
import {Language} from "./enums/Language";
import getAllLanguages = Language.getAllLanguages;

export class ArtworkType {
  id?: string;
  artworkTypeLangInfoList: ArtworkTypeLangInfo[] = [];

  constructor() {
    ArtworkType.initLangInfoList(this);
  }

  public static initLangInfoList(artworkType: ArtworkType) {
    getAllLanguages().forEach((lang: Language) => {
      artworkType.artworkTypeLangInfoList.push(new ArtworkTypeLangInfo(lang));
    });
  }
}
