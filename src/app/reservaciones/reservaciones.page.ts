import { reservacionService } from './reservaciones.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {reserva} from './reservaciones.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { IonItemSliding, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.page.html',
  styleUrls: ['./reservaciones.page.scss'],
})
export class ReservacionesPage implements OnInit, OnDestroy {

  reservacion : reserva[]=[]; //instancia
  reservacionesSub: Subscription;
  isLoading = false;


  constructor(
    private reservacionS : reservacionService,
    private loadingCtrl: LoadingController) {

   }

   ngOnInit() {
    this.reservacionesSub = this.reservacionS.reservaciones.subscribe(rsvs => {
    this.reservacion = rsvs;
    });
    }

  ionViewWillEnter(){
   console.log('IONIC -> ionViewWillEnter');
   this.isLoading = true;
 //CONSUMIMOS EL SERVICIO PARA OBTENER LAS RESERVACIONES DEL USUARIO LOGGEADO
  // this.reservacionesSub =
   this.reservacionS.fetchReservaciones().subscribe(rsvs => {
  this.reservacion = rsvs;
  this.isLoading = false;
 });

  }

  ngOnDestroy()
  {
    if(this.reservacionesSub)
    {
    this.reservacionesSub.unsubscribe();
    }
  }

   onRemoveReservacion(reservacionId: string, slidingEl: IonItemSliding)
   {
      slidingEl.close();
      this.loadingCtrl.create({
      message: 'eliminando reservación ...'
      })
      .then(loadingEl => {
      loadingEl.present();
      this.reservacionS.removeReservacion(reservacionId).subscribe(() => {
      loadingEl.dismiss();
      });
      });
     }


}
