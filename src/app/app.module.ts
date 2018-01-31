import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { appRoutes } from './app.routing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { ProductosService} from './productos.service'
import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListaProductosComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    HttpModule
  ],
  providers: [ ProductosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
