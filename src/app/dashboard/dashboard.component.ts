import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgreso } from '../models/ingresoEgreso';
import * as actionsM from '../ing-egr/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  subsRx: Subscription;
  subsRxList: Subscription;

  constructor(private st: Store<AppState>, private _ie: IngresoEgresoService) { }

  ngOnInit(): void {
    this.subsRx = this.st.select('user').pipe(
      filter(auth => auth.user !== null)
    ).subscribe(({ user }) => {
      this.subsRxList = this._ie.initIngresosEgresosListener(user.uid).subscribe((data: IngresoEgreso[]) => {
        this.st.dispatch(actionsM.setMonto({ montos: data }));
      });
    })
  }

  ngOnDestroy() {
    this.subsRx.unsubscribe();
    if(this.subsRxList){
      this.subsRxList.unsubscribe();
    }
  }

}
