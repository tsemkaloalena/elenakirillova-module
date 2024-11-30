import {Component, Input, OnInit} from "@angular/core";
import {ArtworkContainer} from "../edit-artwork.component";

@Component({
  selector: 'app-edit-artwork-files',
  templateUrl: './edit-artwork-files.component.html',
  styleUrls: ['./edit-artwork-files.component.scss'],
  standalone: false
})
export class EditArtworkFilesComponent implements OnInit {
  @Input() artworkContainer!: ArtworkContainer;

  ngOnInit(): void {
  }

}
