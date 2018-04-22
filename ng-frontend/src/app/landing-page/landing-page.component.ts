import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  searchingFor: string

  constructor( private searchService: SearchService ) { }

  ngOnInit() {
  }

  handleSubmit = (e) => {
    
    e.preventDefault()

    const API_URL = `https://www.googleapis.com/books/v1/volumes?q=`
    const searchFor = this.searchingFor.replace(" ", "+")
    const URL = `${API_URL}${searchFor}&maxResults=40`

    this.searchService.searchBooks(URL)
  }
}
