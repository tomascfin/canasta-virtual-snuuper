import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {ProductosService} from '../productos.service';
import {Producto} from '../shared/producto.model'
import {Compra} from '../shared/compra.model'
import {ActivatedRoute, Params} from '@angular/router';
import {Carro} from '../shared/carro.model';
import {CarroService} from '../carro.service';
import {MatDialog} from '@angular/material';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styles: [`.thumbnail img {
    width: 100%;
  }

  .products {
    border: 1px solid #333;
    background-color: #f1f1f1;
    border-radius: 5px;
    padding: 16px;
    margin-bottom: 20px;
  }

  .demo-2 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 300px;
  }

  .demo-3 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 250px;
  }`]
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
  animal: String;
  name: String;


  constructor(private _productosService: ProductosService,
              private activatedRoute: ActivatedRoute,
              private _CarroService: CarroService,
              public dialog: MatDialog,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id == 'electronics') {
        this.primeraEstacion = true;
        this.buttonName = 'Siguiente estacion';
        this.siguienteEstacion = '/productos/movies';
      } else if (this.id === 'movies') {
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

  openDialog() {
    const dialogRef = this.dialog.open(DialogCompra, {
      height: '150px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog resultado: ${result}`);
    });
  }

  sumarPrecio(producto) {
    this.contadorParaId++;
    let produ = new Producto(producto.id, producto.name, producto.excerpt, producto.price, producto.url);
    this.compra = new Compra(this.contadorParaId, produ);
    ;
    Carro.getInstance().getCompra.push(this.compra);
    // Carro.getInstance().getCantidad = Carro.getInstance().getCompra.length;
    //this.openPopup('small', 'Proceso exitoso');
    Carro.getInstance().getCantidad;
    this._CarroService.editarCantidadArticulos(Carro.getInstance().getCantidad);
    this.openDialog();
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './dialog-compra.html',
})
export class DialogCompra {
}


