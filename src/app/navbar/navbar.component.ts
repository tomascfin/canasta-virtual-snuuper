import {Component, OnInit} from '@angular/core';
import {Carro} from '../shared/carro.model';
import 'rxjs/add/operator/map';
import {CarroService} from '../services/carro.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cantidadProductos: Number = 0;
  public href: string = "";
  rutas: string[];

  constructor(private _carroSerivce: CarroService,
              private router: Router,
              private location: Location) {
  }

  ngOnInit() {
    this.rutas = this.router.url.toString().split("/");
    this.href = this.rutas[this.rutas.length - 1];

    this._carroSerivce.cast.subscribe(
      numero => this.cantidadProductos = numero);

    this.router.events.subscribe((val) => {
      this.rutas = this.router.url.toString().split("/");
      this.href = this.rutas[this.rutas.length - 1];
    });


  }

}
