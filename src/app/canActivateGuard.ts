import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "./login.service";

@Injectable()

export class canActivateGuard implements CanActivate{
    constructor(private router: Router, private activatedRoute: ActivatedRoute, private loginService:LoginService){
    }

   canActivate(route: ActivatedRouteSnapshot,
       state: RouterStateSnapshot):Promise<any>|boolean{
          return new Promise((resolve, reject) => {
             
              this.loginService.loginChanged.subscribe(
                  (z)=>{

                      if(localStorage.getItem('login')){
                        this.loginService.setLoginStatus(true);
                        resolve(true);
                      }else{
                        if(z){
                          resolve(true);
                        }else{
                          this.router.navigateByUrl('/login');
                          resolve(false);
                        }
                      }
                  }
              )
             
              
           });
        }
        
}