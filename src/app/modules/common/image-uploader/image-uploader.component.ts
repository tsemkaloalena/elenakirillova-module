import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  standalone: false
})
export class ImageUploaderComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  onFileUploaded(event: any) {
    const file: File = event.target.files[0];
    if (!!file) {

    }
  }
}
