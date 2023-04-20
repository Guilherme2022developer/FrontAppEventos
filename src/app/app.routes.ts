import { Routes } from '@angular/router';
import { ListaEventosComponent } from './Eventos/lista-eventos/lista-eventos.component';
import { HomeComponent } from './home/home.component';

export const rootRouterConfig: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'eventos', component: ListaEventosComponent},


]