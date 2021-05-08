import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from '../models/ingresoEgreso';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private fireStore: AngularFirestore, private _auth: AuthService) {
  }

  saveIngresoEgreso(monto: IngresoEgreso) {
    const uid = this._auth.user.uid;
    console.log('Guarda archivo');
    return this.fireStore.collection(`montos/${uid}/items`).add({ ...monto });
  }

  initIngresosEgresosListener(uid: string) {
    console.log('Ejecuta');
    return this.fireStore.collection(`montos/${uid}/items`)
      .snapshotChanges().pipe(
        map(data => data.map(doc => ({
          ...doc.payload.doc.data() as IngresoEgreso,
          uid: doc.payload.doc.id
        })
        )
        )
      )
  }

  deleteMonto(uid: string) {
    const uidUser = this._auth.user.uid;
    return this.fireStore.doc(`montos/${uidUser}/items/${uid}`).delete()
  }

}
