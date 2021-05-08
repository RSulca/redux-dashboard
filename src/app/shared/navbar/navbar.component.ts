import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { User } from '../../models/user';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User;
  subsRx: Subscription;

  constructor(private _auth: AuthService, private st: Store<AppState>) {
    this.user = new User('', '', '');
  }

  ngOnInit(): void {
    this.subsRx = this.st.select('user').pipe(
      filter(({ user }) => user !== null)
    ).subscribe(({ user }) => {
      console.log('Escucha');
      this.user = user;
    })
  }

  ngOnDestroy() {
    this.subsRx.unsubscribe();
  }
}
