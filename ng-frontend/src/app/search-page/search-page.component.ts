import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  books: any[] = []

  constructor( private searchService: SearchService ) { }

  ngOnInit() {
    this.searchService.getBooks().subscribe(book => {
      this.books = book
      console.log(this.books)
    })
  }

}
