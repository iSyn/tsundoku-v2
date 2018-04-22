import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  searchingFor: string;
  books: any[] = [];
  selected: object;

  constructor( 
    private searchService: SearchService,
  ) { }

  ngOnInit() {
    this.searchService.getBooks().subscribe(book => {
      this.books = book
      console.log(this.books)
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const searchFor = this.searchingFor.replace(" ", "+")
    this.searchService.searchBooks(searchFor)
  }

  toggleModal = (book: object) => {
    console.log('toggling modal for the book:', book)
  }


}
