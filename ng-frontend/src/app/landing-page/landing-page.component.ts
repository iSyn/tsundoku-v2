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
    
    const searchFor = this.searchingFor.replace(" ", "+")

    this.searchService.searchBooks(searchFor)
  }
}
