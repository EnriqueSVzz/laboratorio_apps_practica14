import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservacionesPage } from './reservaciones.page';

const routes: Routes = [
  {
    path: '',
    component: ReservacionesPage
  },
  {
    path: ':reservacionId',
    loadChildren: () => import('./reservacion-detalle/reservacion-detalle.module').then( m => m.ReservacionDetallePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservacionesPageRoutingModule {}
