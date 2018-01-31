import { Producto } from './producto.model';

export class Compra {
  idCompra: number;
  producto: object;

  public constructor(idCompra: number, producto: Producto) {
    this.idCompra = idCompra,
      this.producto = producto
  }

}
