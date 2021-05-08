import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  user: User;
  subsRx: Subscription;

  constructor(private _auth: AuthService, private router: Router, private st: Store<AppState>) {
    this.user = new User('', '', '');
  }

  ngOnInit(): void {
    this.subsRx = this.st.select('user').subscribe(({ user }) => {
      console.log('Escucha');
      if (user) {
        this.user = user;
      }
    })
  }

  ngOnDestroy() {
    this.subsRx.unsubscribe();
  }

  logout() {
    this._auth.logout().then(() => {
      Swal.fire('Thank you!', '', 'success');
      this.router.navigateByUrl("/login");
    }).catch(error => console.error)
  }

}
