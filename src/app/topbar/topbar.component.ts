import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit,OnDestroy {

  constructor(private loginService:LoginService) { }
  isLogin=false;
  loginSubject:Subscription;
  @Output() toggleEvent = new EventEmitter<boolean>();

  ngOnInit() {
     this.loginSubject=this.loginService.loginChanged.subscribe(
      (z)=>{
        this.isLogin=z;
      }
    )

    this.loginService.loginStatusChanged.subscribe(
      (z)=>{
        this.isLogin=z;
      }
    )
  }



  toggleMenu(){
    this.toggleEvent.next(true);
  }

  loggedOut($event){
    
    this.loginService.setLogin(null);
    localStorage.clear();
  }

  ngOnDestroy(){
    this.loginSubject?this.loginSubject.unsubscribe():null;
  }

}
