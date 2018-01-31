import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductosService} from '../productos.service';
import {Producto} from '../shared/producto.model'
import {Compra} from '../shared/compra.model'
import {ActivatedRoute, Params} from '@angular/router';
import {Carro} from '../shared/carro.model';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styles : [`.thumbnail img {
		width:100%;
	}
  .products {
    border: 1px solid #333;
    background-color: #f1f1f1;
    border-radius: 5px;
    padding: 16px;
    margin-bottom: 20px;
  }`],
  //styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  message: string;
  cantidadItems: number;
  productos: Producto[];
  compra: Compra;
  id: string;
  siguienteEstacion: string;
  anteriorEstacion: string;
  buttonName: string = 'Siguiente estacion';
  buttonNameAnterior: string = 'Estacion anterior';
  primeraEstacion: boolean = true;
  contadorParaId: number = 0;

  constructor(private _productosService: ProductosService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id == 'electronics') {
        this.primeraEstacion = true;
        this.buttonName = 'Siguiente estacion';
        this.siguienteEstacion = '/productos/movies';
      } else if (this.id == 'movies') {
        this.primeraEstacion = false;
        this.buttonName = 'Siguiente estacion';
        this.anteriorEstacion = '/productos/electronics'
        this.siguienteEstacion = '/productos/videogames';
      } else if (this.id == 'videogames') {
        this.primeraEstacion = false;
        this.anteriorEstacion = '/productos/movies'
        this.siguienteEstacion = '/carro/';
        this.buttonName = 'Ir a carro de compras';
      }
      this._productosService.getProductos(this.id).subscribe(
        response => {
          console.log("llamando a servicio");
          console.log(response)
          this.productos = response.items;
        }
      )
    });
  }

  /* openPopup(size, title) {
     this.popup.open(Ng2MessagePopupComponent, {
       classNames: size,
       title: title,
       message: "El articulo ha sido añadido",
       buttons: {
         OK: () => {
           this.message = "El articulo ha sido añadido";
           this.popup.close();
         }
       }
     });
   }*/

  sumarPrecio(producto) {
    this.contadorParaId++;
    let produ = new Producto(producto.id, producto.name, producto.excerpt, producto.price, producto.url);
    this.compra = new Compra(this.contadorParaId, produ);
    ;
    Carro.getInstance().getCompra.push(this.compra);
    //this.openPopup('small', 'Proceso exitoso');

  }

}
