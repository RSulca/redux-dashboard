import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as actionsA from '../auth/auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  subsUser: Subscription;

  constructor(private _authFire: AngularFireAuth, private _fireStore: AngularFirestore, private st: Store<AppState>) {
  }

  initAuthListener() {
    this._authFire.authState.subscribe((data) => {
      if (data) {
        this.subsUser = this._fireStore.doc(`/dataIE/${data.uid}`).valueChanges().subscribe((res: User) => {
          const user = new User(res.uid, res.email, res.fullname);
          this.st.dispatch(actionsA.setUser({ user }));
        })
      } else {
        this.st.dispatch(actionsA.unSetUser());
        if (this.subsUser) {
          this.subsUser.unsubscribe();
        }
      }
    })
  }

  register({ email, password, fullname }) {
    return this._authFire.createUserWithEmailAndPassword(email, password).then(({ user }) => {
      const newUser = new User(user.uid, user.email, fullname);
      console.log(newUser);
      this._fireStore.doc(`dataIE/${user.uid}`).set({ ...newUser }).then(res => {
        console.log(res);
      }).catch(err => console.error)
    });
  }

  login({ email, password }) {
    return this._authFire.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this._authFire.signOut();
  }

  isAuth() {
    return this._authFire.authState.pipe(
      map(res => res != null)
    )
  }

}
