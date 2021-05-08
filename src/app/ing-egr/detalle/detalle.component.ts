import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../../models/ingresoEgreso';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})

export class DetalleComponent implements OnInit, OnDestroy {

  subsRxList: Subscription;
  montos: IngresoEgreso[];

  constructor(private st: Store<AppState>, private _ie: IngresoEgresoService) {
    this.montos = [];
  }

  ngOnInit(): void {
    this.subsRxList = this.st.select('monto').subscribe(({ monto }) => {
      this.montos = monto;
    })
  }

  ngOnDestroy() {
    this.subsRxList.unsubscribe();
  }

  borrarMonto(uid: string) {
    this._ie.deleteMonto(uid).then((res) => {
      console.log('Borrado');
    }).catch((error) => {
      Swal.fire('Error', error.message, 'error')
    })
  }

}
