import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePickerComponent } from './pickers/image-picker/image-picker.component';
import { IonicModule } from '@ionic/angular';
import { LocationPickerComponent } from './pickers/location-picker/location-picker.component';
import { MapModalComponent } from './map-modal/map-modal.component';

@NgModule({
  declarations: [ImagePickerComponent, LocationPickerComponent, MapModalComponent],
  imports: [
  CommonModule, IonicModule
  ],
  exports: [ImagePickerComponent, LocationPickerComponent, MapModalComponent],
  entryComponents: [MapModalComponent]
 })

export class SharedModule { }
