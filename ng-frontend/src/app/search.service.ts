import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'
import { Router } from '@angular/router'

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json'
  })
}

@Injectable()
export class SearchService {

  private _results: any[] = []

  constructor(private http: HttpClient, private router: Router) { }

  searchBooks = async (input) => {

    const API_URL = `https://www.googleapis.com/books/v1/volumes?q=`
    const SEARCH_FOR = input.replace(" ", "+")
    const URL = `${API_URL}${SEARCH_FOR}&maxResults=40`

    return await this.http.get(URL).subscribe(book => {
      this._results = book['items']
      this._results = this._results.filter((a) => {
        if (a.volumeInfo.imageLinks) {
          if (a.volumeInfo.imageLinks.thumbnail) {
            return a
          }
        }
      })
      this.router.navigate(['search'])
    })
  }
  
  getBooks = () => {
    return of(this._results)
  }

}