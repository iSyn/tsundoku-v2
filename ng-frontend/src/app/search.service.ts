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

  searchBooks = async (URL) => {
    return await this.http.get(URL).subscribe(book => {
      this._results = book['items']
      this.router.navigate(['search'])
    })
  }

  getBooks = () => {
    return of(this._results)
  }

}