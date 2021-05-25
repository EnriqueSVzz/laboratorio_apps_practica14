import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DescubrirPageRoutingModule } from './descubrir-routing.module';

import { DescubrirPage } from './descubrir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DescubrirPageRoutingModule
  ],
  declarations: [DescubrirPage]
})
export class DescubrirPageModule {}
