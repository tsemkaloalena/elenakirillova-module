import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: false
})
export class HomePageComponent implements OnInit {
  images: string[] = [];

  ngOnInit(): void {
    // this.images = [];
    // for (let i = 1; i < 8; i++) {
    //   this.images.push(`background-image: url(assets/images/delete-me/${i}.jfif); grid-column-start: ${i*5}; grid-column-end: ${(i + 1)*5}; grid-row-start: ${i*5}; grid-row-end: ${(i + 1)*5};`);
    // }
  }
}
