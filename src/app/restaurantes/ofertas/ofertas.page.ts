import { Subscription } from 'rxjs';
import { OfertaService } from './ofertas.service';
import { Component, OnInit } from '@angular/core';
import {OFERTAS} from './ofertas.model'


@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.page.html',
  styleUrls: ['./ofertas.page.scss'],
})
export class OfertasPage implements OnInit {

  oferta : OFERTAS[]=[];
  oferta_sub : Subscription;
  isLoading = false;
  constructor( private ofertaS: OfertaService)
  {

  }



  ngOnInit() {
    // this.oferta = this.ofertaS.getAlloferta();
    this.oferta_sub = this.ofertaS.Oferta.subscribe(rests =>{
      this.oferta = rests;
    });

  }

  ionViewWillEnter()
  {

    console.log('IONIC -> ionViewWillEnter');
    this.isLoading = true;
    this.oferta_sub = this.ofertaS.fetchOferta().subscribe(() =>{
       this.isLoading = false;
    });
  }

  ngOnDestroy()
  {
    if(this.oferta)
    {
      this.oferta_sub.unsubscribe();
    }
  }

}
