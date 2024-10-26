import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Artwork} from "../../../model/Artwork";
import {ArtworkService} from "../../../service/artwork.service";
import {map} from "rxjs";
import {RedirectService} from "../../../service/redirect.service";

@Component({
  selector: 'app-edit-artwork',
  templateUrl: './edit-artwork.component.html',
  styleUrls: ['./edit-artwork.component.scss']
})
export class EditArtworkComponent implements OnInit {
  isNew: boolean = true;
  artwork: Artwork;

  constructor(private route: ActivatedRoute,
              private artworkService: ArtworkService,
              private redirectService: RedirectService) {
  }

  ngOnInit(): void {
    const artworkId = this.route.snapshot.paramMap.get('id');
    if (!!artworkId) {
      this.isNew = false;
      this.artworkService.getById(artworkId).pipe(
        map(artwork => {
          if (!artwork) {
            window.location.href = this.redirectService.get404Url();
            return;
          }
          this.artwork = artwork;
        })
      ).subscribe();
    } else {
      this.isNew = true;
      this.artwork = new Artwork();
    }
  }


}
