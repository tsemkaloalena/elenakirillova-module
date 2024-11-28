import {Artwork} from "./Artwork";
import {ArtworkSectionLangInfo} from "./ArtworkSectionLangInfo";

export class ArtworkSection {
  id?: string;
  numOrder?: number;
  artworkSectionLangInfos?: ArtworkSectionLangInfo[];
  artworks?: Artwork[];
}
