import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../search.service';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  @Output() outputEvent: EventEmitter<object> = new EventEmitter<object>()

  searchingFor: string;
  books: any[] = [];
  selected: object;

  constructor( 
    private searchService: SearchService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.searchService.getBooks().subscribe(book => {
      this.books = book
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const searchFor = this.searchingFor.replace(" ", "+")
    this.searchService.searchBooks(searchFor)
  }

  setSelected = (book: object) => {
    this.selected = book
    this.modalService.setSelected(this.selected)
    this.outputEvent.emit(this.selected)
  }
  


}
