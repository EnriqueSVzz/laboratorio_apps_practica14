import { reserva } from './reservaciones.model';
import { Injectable } from '@angular/core';
import { Restaurante } from '../restaurantes/restaurante.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { LoginService } from '../login/login.service';



@Injectable ({
  providedIn : 'root'
})

export class reservacionService
{
 private _reservaciones = new BehaviorSubject<reserva[]>([]);
 usuarioId = null;

 get reservaciones(){
  return this._reservaciones.asObservable();
  }
  fetchReservaciones()
  {
    console.log('fetchReservaciones');
    return this.http.get<{[key: string] : reserva}>(
    environment.firebaseUrl + 'reservaciones.json?orderBy="usuarioId"&equalTo="'+ this.usuarioId + '"'
    )
    .pipe(map(dta =>{
    const rests = [];
    for(const key in dta){
    if(dta.hasOwnProperty(key)){
    rests.push(new reserva(
    key,
    dta[key].idRest,
    dta[key].restaurante,
    dta[key].nombre,
    dta[key].fecha,
    dta[key].image,
    dta[key].usuarioId
    ));
    }
    }
    return rests;
    }),
    tap(rest => {
    this._reservaciones.next(rest);
    }));
    }


  // private reservacionS : reserva[]=[

  //   {
  //     idRest: 2,
  //     nombre : 'Carls Jr.',
  //     fecha : 'Lunes 29 de Marzo - 17:00hrs',
  //     image : "https://frankata.com/wp-content/uploads/2019/01/800x600carlsjr-1170x877.jpg"

  //   },
  //   {
  //     idRest: 2,
  //     nombre : 'Cabo Grill.',
  //     fecha : 'Martes 16 de Marzo - 10:00hrs',
  //     image : "https://static.wixstatic.com/media/5e5c92_affdd3dd508a433c84fbf419644e3680.png/v1/fill/w_262,h_203,al_c,q_85,usm_0.66_1.00_0.01/5e5c92_affdd3dd508a433c84fbf419644e3680.webp"

  //   },
  //   {
  //     idRest: 2,
  //     nombre : 'Super Salads.',
  //     fecha : 'Viernas 12 de Marzo - 14:00hrs',
  //     image : "https://cdn.worldvectorlogo.com/logos/super-salads.svg"

  //   },
  // ];

  constructor(
    private http: HttpClient,
    private loginService: LoginService
    ) {
    this.loginService.usuarioId.subscribe(usuarioId => {
    this.usuarioId = usuarioId;
    });
    }

  addReservacion(restaurante: Restaurante, nombre: string, horario: string)
  {
    console.log(restaurante);
    console.log(horario);
    const rsv = new reserva(
    null,
    restaurante.id,
    restaurante.titulo,
    nombre,
    horario,
    restaurante.imgUrl,
    this.usuarioId
    );
    this.http.post<any>(environment.firebaseUrl + 'reservaciones.json', {...rsv}).subscribe(data => {
    console.log(data);
    });
    }

    //Proceso método para consumir nuestra api y borrar un registro

    removeReservacion(reservacionId: string){
      return this.http.delete(`${environment.firebaseUrl}reservaciones/${reservacionId}.json`)
      .pipe(switchMap(()=>{
      return this.reservaciones;
      }), take(1), tap(rsvs => {
      this._reservaciones.next(rsvs.filter(r => r.id !== reservacionId))
      }))
      }


     getReservacion(reservacionId: string){
      const url = environment.firebaseUrl + `reservaciones/${reservacionId}.json`;

      return this.http.get<reserva>(url)
      .pipe(map(dta => {
      return new reserva(
      reservacionId,
      dta.idRest,
      dta.restaurante,
      dta.nombre,
      dta.fecha,
      dta.image,
      dta.usuarioId);
      }));
      }
      updateReservacion(reservacionId: string, reservacion: reserva){
      const url = environment.firebaseUrl + `reservaciones/${reservacionId}.json`;
      this.http.put<any>(url, {...reservacion}).subscribe(data => {
      console.log(data);
      });
      }



}
