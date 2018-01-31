import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Response, Headers} from "@angular/http";

@Injectable()
export class ProductosService {


  constructor(private http: Http) {

  }

  public getProductos(tipoProducto) {
    return this.http.get('./assets/data/api/' + tipoProducto + '.json')
      .map(res => res.json());
  }

  //.map((res:any) => res.json());
  //.catch((error:any) => console.log(error));


}
