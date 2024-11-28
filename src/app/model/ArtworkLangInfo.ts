import {Artwork} from "./Artwork";
import {Language} from "./enums/Language";

export class ArtworkLangInfo {
  id?: string;
  // artwork?: Artwork;
  language?: Language;
  artworkName?: string;
  description?: string;
  materials?: string;
  size?: string;
  price?: string;
  visible?: boolean;
  visibleInPricelist?: boolean;

  constructor(language: Language) {
    this.language = language;
  }
}
