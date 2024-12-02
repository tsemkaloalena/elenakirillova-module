import {Language} from "./enums/Language";

export class ArtworkSectionLangInfo {
  id?: string;
  language: Language;
  sectionName?: string;
  description?: string;
  visible: boolean = true;
  visibleInPricelist: boolean = true;

  constructor(language: Language) {
    this.language = language;
  }
}
