import { Component, OnInit } from '@angular/core';
import { Restaurante } from './restaurante.model';
import { RestauranteService } from './restaurante.service';
@Component({
 selector: 'app-restaurantes',
 templateUrl: './restaurantes.page.html',
 styleUrls: ['./restaurantes.page.scss'],
})
export class RestaurantesPage implements OnInit {
 restaurantes: Restaurante[] = [];
 constructor() { }
 ngOnInit() {
 }
}
