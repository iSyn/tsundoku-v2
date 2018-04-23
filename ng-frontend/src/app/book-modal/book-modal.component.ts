import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../search.service';
import { ModalService } from '../modal.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.css']
})
export class BookModalComponent implements OnInit {

  book: object = {}
  @Output() emitEvent: EventEmitter<null> = new EventEmitter<null>()

  constructor( 
    private modalService: ModalService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.book = this.modalService.getSelected()
  }

  saveBook = async () => {
    await this.http.post('http://localhost:8080/books', this.book).toPromise().then((res) => {
      console.log('res', res)
    }).catch((err) => {
      console.log('err', err)
    })
  }

}
