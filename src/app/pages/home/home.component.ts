import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Song {
  name: string;
  path: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  songs: Song[] = [];

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchSongs();
  }

  fetchSongs() {
    this.http.get<any[]>('https://api.github.com/repos/Darshan0511/music_library/contents/neutral')
      .subscribe(data => {
        this.songs = data
          .filter(item => item.type === 'file' && item.name.endsWith('.mp3'))
          .map(item => ({
            name: this.truncateString(item.name.split('.mp3')[0], 15),
            path: item.download_url
          }));
      });
  }

  truncateString(str: string, maxLen: number): string {
    return str.length > maxLen ? str.substring(0, maxLen) + '...' : str;
  }

  onNavigateToSearch() {
    this.router.navigate(['/search']);
  }
}
