import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as actionsA from '../auth/auth.actions';
import * as actionsM from '../ing-egr/ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  subsUser: Subscription;
  private _user: User;

  get user() {
    return this._user;
  }

  constructor(private authFire: AngularFireAuth, private fireStore: AngularFirestore, private st: Store<AppState>) {
    this._user = null;
  }

  initAuthListener() {
    this.authFire.authState.subscribe((data) => {
      if (data) {
        console.log('Hay data', data);
        this.subsUser = this.fireStore.doc(`/dataIE/${data.uid}`).valueChanges().subscribe((res: User) => {
          const user = new User(res.uid, res.email, res.fullname);
          this._user = user;
          console.log('Hay data real', data);
          this.st.dispatch(actionsA.setUser({ user }));
        })
      } else {
        this._user = null;
        this.st.dispatch(actionsA.unSetUser());
        this.st.dispatch(actionsM.unSetMonto());
        if (this.subsUser) {
          this.subsUser.unsubscribe();
        }
      }
    })
  }

  register({ email, password, fullname }) {
    return this.authFire.createUserWithEmailAndPassword(email, password).then(({ user }) => {
      const newUser = new User(user.uid, user.email, fullname);
      console.log(newUser);
      this.fireStore.doc(`dataIE/${user.uid}`).set({ ...newUser }).then(res => {
        console.log(res);
      }).catch(err => console.error)
    });
  }

  login({ email, password }) {
    return this.authFire.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.authFire.signOut();
  }

  isAuth() {
    return this.authFire.authState.pipe(
      map(res => res != null)
    )
  }

}
