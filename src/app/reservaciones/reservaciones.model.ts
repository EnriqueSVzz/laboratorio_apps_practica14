// export interface reserva
// {

//     idRest: number;
//     nombre: string;
//     fecha : string;
//     image : string;


// }

export class reserva{
  constructor(
  public id: string,
  public idRest: string,
  public restaurante: string,
   public nombre: string,
  public fecha: string,
  public image: string,
   public usuarioId: string
   ){}
 }

