import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Restaurante } from '../restaurante.model';
import { RestauranteService } from '../restaurante.service';
@Component({
 selector: 'app-descubrir'
,
 templateUrl: './descubrir.page.html',
 styleUrls: ['./descubrir.page.scss'],
})
export class DescubrirPage implements OnInit {
 restaurantes: Restaurante[] = [];
 restaurantesSub : Subscription;//CREAMOS ESTE OBJETO PARA CONSUMIR NUESTRO API
 isLoading = false;//CREAMOS ESTA VARIABLE PARA MOSTRAR SI AUN SE ESTA CONSULTANDO EL API
 constructor(
 private restauranteService: RestauranteService,
 private menuCtrl: MenuController
 ) { }
 ngOnInit() {
 console.log('ANGULAR -> ngOnInit');

 //EN EL CALLBACK DE LA SUBSCRIPCION GUARDAMOS LA INFORMACION
 this.restaurantesSub = this.restauranteService.restaurantes.subscribe(rests => {
 this.restaurantes = rests;
 });
 }
 ionViewWillEnter(){
 console.log('IONIC -> ionViewWillEnter');
 this.isLoading = true;
 //EN EL CALLBACK DE LA SUBSCRIPCION GUARDAMOS LA INFORMACION
 this.restaurantesSub = this.restauranteService.fetchRestaurantes().subscribe(() => {
 this.isLoading = false;
 });
 }
 ionViewDidEnter(){
 console.log('IONIC -> ionViewDidEnter');
 }
 ionViewWillLeave(){
 console.log('IONIC -> ionViewWillLeave');
 }
 ionViewDidLeave(){
 console.log('IONIC -> ionViewDidLeave');
 }
 ngOnDestroy(){
 console.log('ANGULAR -> ngOnDestroy');
 //ELIMINAMOS LA SUBSCRIPCION CUANDO SE ELIMINE LA PAGINA
 if(this.restaurantesSub){
 this.restaurantesSub.unsubscribe();
 }
 }
 openSideMenu(){
 this.menuCtrl.open();
 }

}


