import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../modal.service'

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})
export class SearchBookComponent implements OnInit {

  @Input() bookInfo: object
  @Output() bookEmit: EventEmitter<object> = new EventEmitter<object>()

  constructor( private modalService: ModalService ) { }

  ngOnInit() { }

  selectBook = (book) => {
    this.modalService.setSelected(book)
    this.bookEmit.emit(this.bookInfo)
  }
}
