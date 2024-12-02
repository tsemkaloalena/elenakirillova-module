import {Language} from "./enums/Language";

export class ArtworkLangInfo {
  id?: string;
  language: Language;
  artworkName?: string;
  description?: string;
  materials?: string;
  size?: string;
  price?: string;
  visible: boolean = true;
  visibleInPricelist: boolean = true;

  constructor(language: Language) {
    this.language = language;
  }
}
