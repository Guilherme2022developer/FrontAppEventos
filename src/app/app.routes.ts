import { Routes } from '@angular/router';
import { ListaEventosComponent } from './Eventos/lista-eventos/lista-eventos.component';
import { HomeComponent } from './home/home.component';
import { InscricaoComponent } from './usuario/inscricao/inscricao.component';

export const rootRouterConfig: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'eventos', component: ListaEventosComponent},
    {path: 'inscricao', component: InscricaoComponent}

]