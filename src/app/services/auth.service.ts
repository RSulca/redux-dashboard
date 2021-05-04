import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _authFire: AngularFireAuth, private _fireStore: AngularFirestore) {
  }

  initAuthListener() {
    this._authFire.authState.subscribe((data) => {
      console.log(data);
    })
  }

  register({ email, password, fullname }) {
    return this._authFire.createUserWithEmailAndPassword(email, password).then(({ user }) => {
      const newUser = new User(user.uid, user.email, fullname);
      console.log(newUser);
      this._fireStore.collection<User>('dataIE').add({ ...newUser }).then(res => {
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
