import { Routes } from '@angular/router';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
export const appRoutes: Routes = [
  { path: 'productos/:id', component: ListaProductosComponent},
  { path: '', redirectTo: 'productos/electronics', pathMatch: 'full'},
  { path: '**', redirectTo: 'productos/electronics', pathMatch: 'prefix'}
];
