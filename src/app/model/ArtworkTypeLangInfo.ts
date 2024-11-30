import {Language} from "./enums/Language";

export class ArtworkTypeLangInfo {
  id?: string;
  language?: Language;
  typeName?: string;
  visible?: boolean = true;
  visibleInPricelist?: boolean = true;

  constructor(language: Language) {
    this.language = language;
  }
}
