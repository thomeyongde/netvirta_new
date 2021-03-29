import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private LoginService:LoginService,private router: Router) { }

  loginName:String;
  password:String;
  isLogin:boolean=null;

  ngOnInit() {
    this.LoginService.loginChanged.subscribe(
      (z)=>{
        this.isLogin=z;
      }
    )
  }

  login(){
    if(this.loginName=='test@nv.com'&&this.password=='tested'){
      this.LoginService.setLogin(true);
      this.isLogin=true;
      console.log('login success');
      this.router.navigate(['/user']);
      console.log('redirecting');
    }else{
      this.LoginService.setLogin(false);
      this.isLogin=false;
    }
  }

}
