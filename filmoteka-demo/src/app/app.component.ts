import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from './movies/Movie.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  query = '';
  appTitle = 'filmoteka-demo';
  count:number= 0;
  filteredMovies:Movie [] = [];

  constructor(private httpClient:HttpClient){}

  incrementCounter() {
    console.log('increment');
    this.count = this.count+1;
  }

  searchMovies() {
    const url = `${environment.serverUrl}movies/searct/${this.query}`;
    this.httpClient.get<Movie[]>('url').subscribe((response: Movie[]) => {
      console.log(response);
      this.filteredMovies = response;
    })
  }
}
