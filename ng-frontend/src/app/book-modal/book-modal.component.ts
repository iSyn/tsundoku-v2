import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.css']
})
export class BookModalComponent implements OnInit {

  book: object = {}

  constructor( private modalService: ModalService ) { }

  ngOnInit() {
    this.book = this.modalService.getSelected()
  }

}
