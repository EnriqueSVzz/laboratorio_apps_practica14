import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestauranteDetallePage } from './restaurante-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: RestauranteDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestauranteDetallePageRoutingModule {}
