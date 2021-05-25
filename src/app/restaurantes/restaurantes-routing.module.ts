import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantesPage } from './restaurantes.page';
const routes: Routes = [
 {
 path: 'tabs',
 component: RestaurantesPage,
 children: [
 {
 path: 'descubrir'
,
 children: [
 {
 path: ''
,
 loadChildren: () => import('./descubrir/descubrir.module').then( m => m.DescubrirPageModule)
 },
 {
 path: ':restauranteId',
 loadChildren: () => import('./restaurante-detalle/restaurante-detalle.module')
 .then( m => m.RestauranteDetallePageModule)
 },
 ]
 },
 {
 path: 'ofertas',
 loadChildren: () => import('./ofertas/ofertas.module').then( m => m.OfertasPageModule)
 },
 {
 path:''
,
 redirectTo: '/restaurantes/tabs/descubrir'
,
 pathMatch: 'full'
 }
 ]
 },
 {
 path:''
,
 redirectTo: '/restaurantes/tabs/descubrir'
,
 pathMatch: 'full'
 }
];
@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule],
})
export class RestaurantesPageRoutingModule {}
