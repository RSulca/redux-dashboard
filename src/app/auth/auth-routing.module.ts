import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth.component';


const routes: Routes = [
  // {
    // path: '', component: AuthComponent, children: [
    //   { path: '', pathMatch: 'full', redirectTo: 'login' },
    //   { path: 'login', component: LoginComponent },
    //   { path: 'register', component: RegisterComponent }
    // ]
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', pathMatch: 'full', redirectTo: 'login' }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }