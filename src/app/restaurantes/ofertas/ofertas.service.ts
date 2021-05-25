import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {OFERTAS} from './ofertas.model';

@Injectable ({
  providedIn : 'root'
})

export class OfertaService
{
  private _ofertas = new BehaviorSubject<OFERTAS[]>([]);
  // private  oferta : OFERTAS[]=[
  //   {
  //     id:null,
  //     title: 'CABOOOO ADICTO!!!! ',
  //     descripcion :'VEN CON TODA TU FAMILIA AL MEJOR RESTAURANTE A COMER ESTE LUNES a VIERNES POR $109 ' ,
  //     vigencia :' HASTA EL 25 DE MAYO DEL 2021 ' ,
  //     image : 'https://mk0cazaofertassmxlbf.kinstacdn.com/wp-content/uploads/2014/12/cabo-grill-monterrey.jpg'

  //   },
  //   {
  //     id:null,
  //     title: 'Hamburguesa en $1 peso!!!! ',
  //     descripcion :'Disfruta con quien tu quieras !! ' ,
  //     vigencia :' HASTA DEJAR EXISTENCIA ' ,
  //     image : 'https://i2.wp.com/liquidazona.com/wp-content/uploads/2019/05/Portada-66.png'
  //   },
  //   {
  //     id:null,
  //     title: 'PAGA MENOS Y LLEVA MAS!!!! ',
  //     descripcion :'Medio ensalada gratis' ,
  //     vigencia :' HASTA EL 13 DE SEPTIEMBRE DEL 2021 ' ,
  //     image : 'https://mk0cazaofertassmxlbf.kinstacdn.com/wp-content/uploads/2015/09/11951605_1024619720922454_4702590628465705361_o.jpg'
  //   },
  // ];

  constructor( private http : HttpClient)
  {

  }
  addOferta( oferta : OFERTAS) //instancia
  {
    this.http.post<any>(environment.firebaseUrl + 'ofertas.json', {...oferta}).subscribe(data => {
      console.log(data);
    });
  }

   get Oferta()
   {
    return this._ofertas.asObservable();
   }

  // getAlloferta()
  // {
  //   // this.addOferta(this.oferta[0])
  //   // this.addOferta(this.oferta[1])
  //   // this.addOferta(this.oferta[2])
  //   return [...this.oferta];
  // }

  fetchOferta()
  {

    return this.http.get<{[key: string] : OFERTAS}>(
    environment.firebaseUrl + 'ofertas.json'
    )
    .pipe(map(dta =>{
      const rests = [];
    for(const key in dta)
    {
    if(dta.hasOwnProperty(key))
    {
      rests.push(
      new OFERTAS(
        key,
        dta[key].title,
        dta[key].descripcion,
        dta[key].vigencia,
        dta[key].image,
      )
      );
    }
    }
    return rests;
    }),
    tap(rest => {
    this._ofertas.next(rest);
    }));
    }

}
