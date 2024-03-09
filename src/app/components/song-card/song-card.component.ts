import { Component, Input } from '@angular/core';

interface Song {
  name: string;
  path: string;
}

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.css']
})
export class SongCardComponent {
  @Input() song!: Song; 
}
