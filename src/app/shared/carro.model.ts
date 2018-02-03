import { Compra } from './compra.model';

export class Carro {
  //utilice patron singleton porque me vi en la necesidad de crear solo una instancia del carrito de compras
  private static instance: Carro = new Carro();
  private _compra : Array<Compra> = [];
  private  _valorTotal : number;
  public _cantidad : Number = 0;


  constructor(){
    if(Carro.instance){
      throw new Error("Error");
    }
    Carro.instance = this;
  }


  static getInstance(): Carro {

    return Carro.instance;
  }

  get getCompra():Array<Compra> {
    
    return  Carro.instance._compra;
  }

  set setCompra(value:Array<Compra>) {
    Carro.instance._compra = value;
  }

  get getValorTotal(){
    return Carro.instance._valorTotal;
  }

  set setValorTotal(valor: number){
    Carro.instance._valorTotal = valor;
  }

  set setCantidad (valor: Number){
    Carro.instance._cantidad = this._compra.length;
  }

  get getCantidad (): Number{
    /*if(Carro.instance != null){
      console.log("entra 1")
      this._cantidad = Carro.instance._compra.length;
    }else{
      console.log("entra 2")
      this._cantidad = 0;
    }*/
    
    this._cantidad = Carro.instance._compra.length;
    console.log("cantidad articulos", Carro.instance._compra.length);
    return Carro.instance._compra.length;
    //return this._cantidad;
  }
}
