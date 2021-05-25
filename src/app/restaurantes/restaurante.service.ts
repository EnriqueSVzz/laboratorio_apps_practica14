import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Restaurante } from "./restaurante.model";
@Injectable({
 providedIn: 'root'
})
export class RestauranteService{
 constructor(private http: HttpClient){}
 private _restaurantes = new BehaviorSubject<Restaurante[]>([]);
 get restaurantes(){
 return this._restaurantes.asObservable();
 }

 addRestaurante(restaurante: Restaurante){
 this.http.post<any>(
 environment.firebaseUrl + 'restaurantes.json', {...this.restaurantes[0]}
 )
 .subscribe(data => {
 console.log(data);
 });
 }
 //CREAMOS ESTE METODO PARA CONSULTAR LOS RESTAURANTES
 fetchRestaurantes(){
 return this.http.get<{[key: string] : Restaurante}>(
 environment.firebaseUrl + 'restaurantes.json'
 )
 .pipe(map(dta =>{
 const rests = [];
 for(const key in dta){
 if(dta.hasOwnProperty(key)){
 rests.push(
 new Restaurante(key, dta[key].titulo, dta[key].imgUrl, dta[key].platillos, dta[key].lat, dta[key].lng,
 ));
 }
 }
 return rests;
 }),
 tap(rest => {
 this._restaurantes.next(rest);
 }));
 }

 //MODIFICAMOS EL METODO PARA LA CONSULTA DE UN SOLO ELEMENTO
 getRestaurante(restauranteId: string){
 const url = environment.firebaseUrl + `restaurantes/${restauranteId}.json`;
 return this.http.get<Restaurante>(url)
 .pipe(map(dta => {
 return new Restaurante(restauranteId, dta.titulo, dta.imgUrl, dta.platillos, dta.lat, dta.lng);
 }));
 }
}
