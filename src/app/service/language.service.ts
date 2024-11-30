import {Injectable} from "@angular/core";
import {Language} from "../model/enums/Language";
import {ArtworkLangInfo} from "../model/ArtworkLangInfo";
import {Artwork} from "../model/Artwork";
import {ArtworkType} from "../model/ArtworkType";
import {ArtworkTypeLangInfo} from "../model/ArtworkTypeLangInfo";
import {ArtworkSection} from "../model/ArtworkSection";
import {ArtworkSectionLangInfo} from "../model/ArtworkSectionLangInfo";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  public getArtworkInfo(artwork: Artwork, language: Language): ArtworkLangInfo {
    if (!language) {
      language = Language.getAdminLanguage();
    }
    const langInfo = artwork.artworkLangInfoList?.find(info => info.language === language);
    if (!langInfo) {
      Artwork.initLangInfoList(artwork);
      return this.getArtworkInfo(artwork, language);
    }
    return langInfo;
  }

  public getArtworkTypeInfo(type: ArtworkType, language?: Language): ArtworkTypeLangInfo {
    if (!language) {
      language = Language.getAdminLanguage();
    }
    let langInfo = type.artworkTypeLangInfoList?.find(info => info.language === language);
    if (!langInfo) {
      ArtworkType.initLangInfoList(type);
      return this.getArtworkTypeInfo(type, language);
    }
    return langInfo;
  }

  public getArtworkSectionInfo(section: ArtworkSection, language?: Language): ArtworkSectionLangInfo {
    if (!language) {
      language = Language.getAdminLanguage();
    }
    let langInfo = section.artworkSectionLangInfos?.find(info => info.language === language);
    if (!langInfo) {
      ArtworkSection.initLangInfoList(section);
      return this.getArtworkSectionInfo(section, language);
    }
    return langInfo;
  }
}
