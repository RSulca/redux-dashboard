import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { IngEgrComponent } from './ing-egr.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: 'ingegr', component: IngEgrComponent },
      { path: 'estadistica', component: EstadisticaComponent },
      { path: 'detalle', component: DetalleComponent },
      { path: '', pathMatch: 'full', redirectTo: 'estadistica' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngresoEgresoRoutingModule { }
