import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {ProductosService} from '../productos.service';
import {Producto} from '../shared/producto.model'
import {Compra} from '../shared/compra.model'
import {ActivatedRoute, Params} from '@angular/router';
import {Carro} from '../shared/carro.model';
import {CarroService} from '../carro.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

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
  animal : String ;
  name: String ;


  constructor(private _productosService: ProductosService,
              private activatedRoute: ActivatedRoute,
            private _CarroService : CarroService,
            public dialog: MatDialog) {
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
   // Carro.getInstance().getCantidad = Carro.getInstance().getCompra.length;
    //this.openPopup('small', 'Proceso exitoso');
    Carro.getInstance().getCantidad;
this._CarroService.editarCantidadArticulos( Carro.getInstance().getCantidad);
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });

  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
