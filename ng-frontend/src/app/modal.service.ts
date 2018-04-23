import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class ModalService {

  selected: object = {};

  constructor() { }

  setSelected = (book) => {
    this.selected = book
  }

  closeAllModals = () => {
    //
  }

  getSelected = () => this.selected

}
