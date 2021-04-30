import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngresoEgresoRoutingModule } from './ingreso-egreso-routing.module';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { IngEgrComponent } from './ing-egr.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    EstadisticaComponent,
    DetalleComponent,
    IngEgrComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    IngresoEgresoRoutingModule,
    SharedModule
  ]
})
export class IngresoEgresoModule { }
