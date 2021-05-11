import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private _auth: AuthService, private router: Router) {
  }

  canLoad(): Observable<boolean> {
    return this._auth.isAuth().pipe(
      tap((res) => {
        // console.log(res);
        if (!res) {
          // console.log('Sal');
          this.router.navigateByUrl("/auth");
        }
      }),
      take(1)
    );
  }

  canActivate(): Observable<boolean> {
    return this._auth.isAuth().pipe(
      tap((res) => {
        // console.log(res);
        if (!res) {
          // console.log('Entra activate');
          this.router.navigateByUrl("/auth");
        }
      })
    );
  }

}
