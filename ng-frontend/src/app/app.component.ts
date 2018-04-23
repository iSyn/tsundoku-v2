import { Component, OnInit } from '@angular/core';
import { HamburgerMenuService } from './hamburger-menu.service';
import { Subscription } from 'rxjs/Subscription';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showHamburgerMenu: boolean = false
  showSigninModal: boolean = false

  // subscription: Subscription
  // subscription2: Subscription

  constructor( 
    private hamburgerMenu: HamburgerMenuService,
    private users: UsersService
  ) { 
    this.hamburgerMenu.getStatus().subscribe((status) => {
      this.showHamburgerMenu = status
    })
    this.users.getSigninModalStatus().subscribe((status) => {
      this.showSigninModal = status
    })
  }

  ngOnInit() {
    // this.hamburgerMenu.
  }

  toggleMenu = () => {
    this.showHamburgerMenu = !this.showHamburgerMenu
  }
}
