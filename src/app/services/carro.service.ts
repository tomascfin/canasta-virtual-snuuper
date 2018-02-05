import { Injectable } from '@angular/core';
import {Carro} from '../shared/carro.model';
import {BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CarroService {

  private data = new BehaviorSubject<Number>(Carro.getInstance().getCantidad);
  cast = this.data.asObservable();

  constructor() { }

   editarCantidadArticulos(cantidad : Number){
     this.data.next(cantidad);
   }


}
