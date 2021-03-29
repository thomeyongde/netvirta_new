import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private Login:boolean=false;
  public loginChanged=new BehaviorSubject<boolean>(null);
  public loginStatusChanged=new BehaviorSubject<boolean>(null);

  constructor() { }

  setLogin(login){
    this.Login=login;
    localStorage.setItem('login', login);
    this.loginChanged.next(this.Login);
  }

  setLoginStatus(login){
    this.Login=login;
    this.loginStatusChanged.next(this.Login);
  }


}
