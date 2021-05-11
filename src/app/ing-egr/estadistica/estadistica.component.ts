import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../../models/ingresoEgreso';
import { Subscription } from 'rxjs';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { StateWithIE } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  tIngreso: number;
  ingreso: number;
  tEgreso: number;
  egreso: number;
  subsEst: Subscription;

  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';


  constructor(private st: Store<StateWithIE>) {
    this.doughnutChartLabels = ['Ingresos', 'Egresos'];
    this.doughnutChartData = [[0, 0]];
    this.ingreso = 0;
    this.tIngreso = 0;
    this.egreso = 0;
    this.tEgreso = 0;
  }

  ngOnInit(): void {
    this.subsEst = this.st.select('ingresoEgreso').subscribe(({ monto }) => {
      // console.log('Hola');
      // console.log(monto);
      this.cargarEstadistica(monto);
    })
  }

  ngOnDestroy() {
    this.subsEst.unsubscribe();
  }

  cargarEstadistica(montos: IngresoEgreso[]) {
    this.ingreso = 0;
    this.tIngreso = 0;
    this.egreso = 0;
    this.tEgreso = 0;
    montos.forEach(monto => {
      if (monto.tipo === 'I') {
        this.tIngreso += monto.monto;
        this.ingreso++;
      } else {
        this.tEgreso += monto.monto;
        this.egreso++;
      }
    });
    this.doughnutChartData = [[this.tIngreso, this.tEgreso]];
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

}
