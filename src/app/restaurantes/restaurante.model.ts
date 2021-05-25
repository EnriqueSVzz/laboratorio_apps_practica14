import { environment } from "src/environments/environment";

export class Restaurante{
  constructor(
  public id: string,
  public titulo: string,
  public imgUrl: string,
  public platillos: string[],
  public lat: number, //SE AGREGA ESTA PROPIEDADES
  public lng: number, //SE AGREGA ESTA PROPIEDADES

  ){}

  public getStaticMap(){
    return `https://maps.googleapis.com/maps/api/staticmap?center=${this.lat},${this.lng}&zoom=16&size=500x300&maptype=roadmap&markers=color:red%7Clabel:Lugar%7C${this.lat},${this.lng}&key=${environment.googleApikey}`
  }
 }

