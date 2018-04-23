import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UsersService {

  private subject: Subject<any> = new Subject<any>()
  showSigninModal: boolean = false

  user: object = {}

  constructor(
    private http: HttpClient
  ) { }

  getSigninModalStatus = (): Observable<boolean> => {
    this.subject.next(this.showSigninModal)
    return this.subject.asObservable()
  }

  signIn = async (username, password) => {
    console.log('trying to sign in from users service with:', username, password)
    // await this.http.get('http://localhost:8080/users').toPromise().then((res) => {
    //   console.log('res from signin service', res)
    // })
    await this.http.get(`http://localhost:8080/users/username/${username}`).toPromise().then((res) => {
      if (res['password'] === password) {
        console.log('FOUND USER, LOGGING IN')
      } else {
        console.log('incorrect password for user', username)
      }
    })
  }

  toggleModal = () => {
    this.showSigninModal = !this.showSigninModal
  }

}
