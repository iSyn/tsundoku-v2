import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-signin-modal',
  templateUrl: './signin-modal.component.html',
  styleUrls: ['./signin-modal.component.css']
})
export class SigninModalComponent implements OnInit {

  username: string;
  password: string;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
  }

  handleSubmit = (e) => {
    e.preventDefault()

    console.log('username', this.username)
    console.log('password', this.password)

    this.usersService.signIn(this.username, this.password)
  }

}
