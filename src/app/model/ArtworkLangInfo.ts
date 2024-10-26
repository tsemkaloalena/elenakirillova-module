import {Artwork} from "./Artwork";
import {Language} from "./enums/Language";

export class ArtworkLangInfo {
  id: string;
  artwork: Artwork;
  language: Language;
  artworkName: string;
  description: string;
  materials: string;
  size: string;
  price: string;

  constructor(artwork: Artwork, language: Language) {
    this.artwork = artwork;
    this.language = language;
  }
}
