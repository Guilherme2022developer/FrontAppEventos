import { NgModule } from '@angular/core';
import { BrowserModule,Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';


import {
  NgxSnotifireModule,
  SnotifireService,
  ToastDefaults,
} from "ngx-snotifire";

//shared componets
import { MenuSuperiorComponent } from './shared/menu-superior/menu-superior.component';
import { MainPrincipalComponent } from './shared/main-principal/main-principal.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MenuLoginComponent } from './shared/menu-login/menu-login.component';

//componets
import { HomeComponent } from './home/home.component';
import { ListaEventosComponent } from './Eventos/lista-eventos/lista-eventos.component';
import { AppComponent } from './app.component';

//botstrap
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { rootRouterConfig } from './app.routes';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

//services
import { SeoService } from './services/seo.service';
import { InscricaoComponent } from './usuario/inscricao/inscricao.component';
import { OrganizadorService } from './services/organizador.sevice';
import { LoginComponent } from './usuario/login/login.component';

//import {CollapseModule} from 'ngx-bootstrap/collapse';

@NgModule({
  declarations: [
    AppComponent,
    MenuSuperiorComponent,
    MainPrincipalComponent,
    FooterComponent,
    HomeComponent,
    MenuLoginComponent,
    ListaEventosComponent,
    InscricaoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    NgxSnotifireModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    CollapseModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule.forRoot(),
    RouterModule.forRoot(rootRouterConfig,{useHash: false}),
  ],
  providers: [
  Title,
  SeoService,
  OrganizadorService,
  { provide: "snotifireConfig", useValue: ToastDefaults },
    SnotifireService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
