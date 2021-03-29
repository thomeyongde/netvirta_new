import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { canActivateGuard } from './canActivateGuard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'user',component:AdminComponent, canActivate : [canActivateGuard]},
  {path: 'login',component:LoginComponent},
  {path:'**',redirectTo: 'user'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
