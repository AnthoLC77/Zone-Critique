import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModaleService {

  private loginModalSubject = new Subject<void>();
  loginModal$ = this.loginModalSubject.asObservable();

  constructor() { }

  openLoginModal() {
    this.loginModalSubject.next();
  }
}
