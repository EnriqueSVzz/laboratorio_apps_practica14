import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservacionDetallePageRoutingModule } from './reservacion-detalle-routing.module';

import { ReservacionDetallePage } from './reservacion-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservacionDetallePageRoutingModule
  ],
  declarations: [ReservacionDetallePage]
})
export class ReservacionDetallePageModule {}
