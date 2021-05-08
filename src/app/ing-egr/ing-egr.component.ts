import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as actions from '../shared/ui.actions';

@Component({
  selector: 'app-ing-egr',
  templateUrl: './ing-egr.component.html',
  styleUrls: ['./ing-egr.component.css']
})
export class IngEgrComponent implements OnInit, OnDestroy {

  formMonto: FormGroup;
  tipo: string;
  loading: boolean;
  subsRx: Subscription;

  constructor(private fb: FormBuilder, private _ie: IngresoEgresoService, private st: Store<AppState>) {
    this.tipo = 'I';
    this.loading = false;
    this.formMonto = this.fb.group({
      descripcion: ['', [Validators.required]],
      monto: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.subsRx = this.st.select('isLoading').subscribe(({ isLoading }) => {
      this.loading = isLoading;
    })
  }

  ngOnDestroy() {
    this.subsRx.unsubscribe();
  }

  save() {
    console.log('Entra a boton');
    this.st.dispatch(actions.isLoading());
    this._ie.saveIngresoEgreso({ ...this.formMonto.value, tipo: this.tipo })
      .then((res) => {
        console.log('Guardo 1 archivo');
        this.st.dispatch(actions.stopLoading());
        Swal.fire('Agregado', '', 'success');
        this.formMonto.reset();
        this.tipo = 'I';
      })
      .catch((error) => {
        this.st.dispatch(actions.stopLoading());
        Swal.fire('Error', '', 'error')
      });
  }

  changeType() {
    (this.tipo === 'I') ? this.tipo = 'E' : this.tipo = 'I'
  }

}
