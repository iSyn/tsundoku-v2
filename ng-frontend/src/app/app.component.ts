import { Component, OnInit } from '@angular/core';
import { HamburgerMenuService } from './hamburger-menu.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showHamburgerMenu: boolean = false
  subscription: Subscription

  constructor( private hamburgerMenu: HamburgerMenuService ) { 
    this.subscription = this.hamburgerMenu.getStatus().subscribe((status) => {
      this.showHamburgerMenu = status
    })
  }

  ngOnInit() {
    // this.hamburgerMenu.
  }

  toggleMenu = () => {
    this.showHamburgerMenu = !this.showHamburgerMenu
  }
}
