import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service'

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.css']
})
export class HamburgerMenuComponent implements OnInit {

  constructor( private usersService: UsersService) { }

  ngOnInit() {
  }

  handleSigninClick = () => {
    this.usersService.toggleSigninModal()
    console.log(this.usersService.getSigninModalStatus())
  }

  handleSignupClick = () => {
    this.usersService.toggleSignupModal()
    console.log(this.usersService.getSignupModalStatus())
  }

}
