import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UsersService {

  private subject: Subject<any> = new Subject<any>()
  private subject2: Subject<any> = new Subject<any>()
  showSigninModal: boolean = false
  showSignupModal: boolean = false

  user: object = {}

  constructor(
    private http: HttpClient
  ) { }

  getSigninModalStatus = (): Observable<boolean> => {
    this.subject.next(this.showSigninModal)
    return this.subject.asObservable()
  }

  getSignupModalStatus = (): Observable<boolean> => {
    this.subject2.next(this.showSignupModal)
    console.log(this.showSignupModal)
    return this.subject2.asObservable()
  }

  signIn = async (username, password) => {
    await this.http.get(`http://localhost:8080/users/username/${username}`).toPromise().then((res) => {
      if (res['password'] === password) {
        console.log('FOUND USER, LOGGING IN')
      } else {
        console.log('incorrect password for user', username)
      }
    })
  }

  signUp = async (newUser) => {
    console.log('signing up:', newUser)
    await this.http.post('http://localhost:8080/users', newUser).toPromise().then((res) => {
      console.log('SIGN UP RES', res)
    })
  }

  toggleSigninModal = () => { this.showSigninModal = !this.showSigninModal }
  toggleSignupModal = () => { this.showSignupModal = !this.showSignupModal }



}
