import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class HamburgerMenuService {

  private subject: Subject<any> = new Subject<any>()
  showHamburgerMenu: boolean = false

  getStatus = (): Observable<boolean> => {
    this.subject.next(this.showHamburgerMenu)
    return this.subject.asObservable()
  }

  toggleStatus = () => {
    this.showHamburgerMenu = !this.showHamburgerMenu
  }

}
