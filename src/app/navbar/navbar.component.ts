import { Component, OnInit } from '@angular/core';
import {Carro} from '../shared/carro.model';
import 'rxjs/add/operator/map';
import {CarroService} from '../carro.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cantidadProductos : Number= 0;

  constructor(private _carroSerivce: CarroService) { }

  ngOnInit() {
    //Carro.getInstance().getValorTotal = this.precioTotal;
    console.log(" on init del navbar")
    console.log(this.cantidadProductos);
    //this.cantidadProductos =  Carro.getInstance().getCantidad.suscribe;
      this._carroSerivce.cast.subscribe(
      numero => this.cantidadProductos = numero);

  }

}
