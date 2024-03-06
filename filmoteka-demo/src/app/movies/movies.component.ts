import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from './Movie.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit{

  @Input() title:string = '';
  @Output() countChange = new EventEmitter();


  @Input() movies:Movie[] = [];


  constructor(private httpClient:HttpClient){

  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  fetchMovies(){
    console.log('fetch...');
    const url = `${environment.serverUrl}movies/all`;
    this.httpClient.get<Movie[]>(url).subscribe((response:Movie[]) => {
      this.movies = response;
      this.countChange.emit();
    });

  }
}
