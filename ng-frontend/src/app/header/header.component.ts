import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { HamburgerMenuService } from '../hamburger-menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( 
    private router: Router,
    private hamburgerMenu: HamburgerMenuService
  ) { }

  ngOnInit() {
  }

  goHome = () => {
    console.log('go home firing')
    this.router.navigate([''])
  }

  handleClick = () => {
    this.hamburgerMenu.toggleStatus()
    console.log(this.hamburgerMenu.getStatus()) // I DONT KNOW WHY BUT THIS IS IMPORTANT
  }
}
