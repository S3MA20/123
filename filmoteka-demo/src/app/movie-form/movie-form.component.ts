import { Component, OnInit } from '@angular/core';
import { Movie } from '../movies/Movie.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent  implements OnInit {

  movie:Movie = {} as Movie;

  constructor(private httpClient:HttpClient) {}

  ngOnInit(): void {

  }

  cancelMovie(){
    this.movie = {} as Movie;
  }

  saveMovie(){
    console.log(this.movie);
    const url = `${environment.serverUrl}movie`
    this.httpClient.post<Movie>(url,this.movie).subscribe((response:any) =>{
      console.log(response)
    })

  }

}
