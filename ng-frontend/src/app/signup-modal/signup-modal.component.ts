import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css']
})
export class SignupModalComponent implements OnInit {

  username: string;
  password: string;
  confirmPassword: string

  constructor( private usersService: UsersService) { }

  ngOnInit() {
  }

  handleSubmit = (e) => {
    e.preventDefault()

    let newUser = {
      username: this.username,
      password: this.password,
      date_created: new Date()
    }

    if (this.password === this.confirmPassword) {
      this.usersService.signUp(newUser)
    }

  }

}
