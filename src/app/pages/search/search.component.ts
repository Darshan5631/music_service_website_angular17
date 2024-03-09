import { Component, Renderer2, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

interface Song {
  name: string;
  path: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  songs: Song[] = [];

  constructor(private renderer: Renderer2, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.setStyle(document.body, 'background-color', 'black');
    }
  }

  onNavigateToLogout() {
    this.router.navigate(['/home']);
  }

  async search() {
    if (isPlatformBrowser(this.platformId)) {
      const query = (document.querySelector('.search-field') as HTMLInputElement).value.toLowerCase();

      if (query.trim() !== '') {
        this.renderer.setStyle(document.body, 'background-color', 'black');

        const response = await fetch(`https://api.github.com/repos/Darshan0511/music_library/contents/${query}`);
        const data = await response.json();

        this.songs = [];
        for (const item of data) {
          if (item.type === 'file' && item.name.endsWith('.mp3')) {
            this.songs.push({
              name: this.truncateString(item.name.split('.mp3')[0], 15),
              path: item.download_url
            });
          }
        }
      }
    }
  }

  truncateString(str: string, maxLen: number): string {
    return str.length > maxLen ? str.substring(0, maxLen) + '...' : str;
  }
}
