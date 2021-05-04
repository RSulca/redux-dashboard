import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _auth: AuthService, private router:Router) {
  }

  canActivate(): Observable<boolean> {
    return this._auth.isAuth().pipe(
      tap((res) => {
        if(!res){
          this.router.navigateByUrl("/login");
        }
      })
    );
  }

}
