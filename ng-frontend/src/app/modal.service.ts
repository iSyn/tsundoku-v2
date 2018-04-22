import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class ModalService {

  @Output() selectedEvent = new EventEmitter<object>()
  selectedBook: object;

  constructor() { }

  selectBook = (book) => {
    this.selectedBook = book
    this.selectedEvent.emit(this.selectedBook)
  }

  getSelectedBook = () => this.selectedBook

}
