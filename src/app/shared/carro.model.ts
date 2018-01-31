import { Compra } from './compra.model';

export class Carro {
  //utilice patron singleton porque me vi en la necesidad de crear solo una instancia del carrito de compras
  private static instance: Carro = new Carro();
  private _compra : Array<Compra> = [];
  private  _valorTotal : number;


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
}
