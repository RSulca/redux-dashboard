import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngresoEgresoRoutingModule } from './ingreso-egreso-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { IngEgrComponent } from './ing-egr.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { SortIEPipe } from '../pipes/sort-ie.pipe';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    EstadisticaComponent,
    DetalleComponent,
    IngEgrComponent,
    DashboardComponent,
    SortIEPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IngresoEgresoRoutingModule,
    SharedModule,
    ChartsModule
  ]
})
export class IngresoEgresoModule { }
