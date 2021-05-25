import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DescubrirPage } from './descubrir.page';

const routes: Routes = [
  {
    path: '',
    component: DescubrirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DescubrirPageRoutingModule {}
