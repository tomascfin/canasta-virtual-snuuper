import { Component, OnInit } from '@angular/core';
import {Producto} from '../shared/producto.model'
import {Compra} from '../shared/compra.model'
import { Http } from '@angular/http';
import { Router, RouterLinkActive} from '@angular/router';
import {Carro} from '../shared/carro.model';
import {CarroService} from '../services/carro.service';
@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.css']
})
export class CarroComponent implements OnInit {


	carro = [];
	precioTotal : number=0;
	estaciones = [
	{nombreEstacion: "Electrónicos", id: "electronics"},
	{nombreEstacion: "Películas", id: "movies"},
  {nombreEstacion: "Video-Juegos", id: "videogames"}];
  prueba : Number = 0;


	ordenDeCompra = {total: null as number, articulos: new Array<Compra>()};

	constructor(private http: Http,
	private _CarroService : CarroService){}

	ngOnInit(){
		this.carro = Carro.getInstance().getCompra;
    this.calcularTotal();
    console.log("  Carro.getInstance().getCantidad:"+  Carro.getInstance().getCompra.length);
	}

	calcularTotal(){
		if (this.carro != null && this.carro.length > 0 ) {
			for(var item of this.carro){
				this.precioTotal = this.precioTotal + item.producto.price;
			}
		}

  }


	eliminarArticulo(compra){
    console.log("entra a eliminarArticulo");
		this.carro = this.carro.filter(obj => obj !== compra);
		Carro.getInstance().setCompra = Carro.getInstance().getCompra.filter(obj => obj !== compra);
		this.precioTotal = this.precioTotal - compra.producto.price;
		this._CarroService.editarCantidadArticulos( +Carro.getInstance().getCantidad);
	}

	generarCompra(){
		Carro.getInstance().setValorTotal = this.precioTotal;
		this.ordenDeCompra.total =  this.precioTotal;
		this.ordenDeCompra.articulos = Carro.getInstance().getCompra;
		console.log(this.ordenDeCompra);
	}

}
