import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable } from "rxjs";
import { Categoria, Evento } from "../Eventos/modls_eventos/evento";
import { SeviceBase } from "./sevice.base";



@Injectable()
export class EventoService extends SeviceBase{

    constructor(private http: HttpClient){super()}


        ObterCategoria() : Observable<Categoria[]>{
            return this.http
            .get<Categoria[]>(this.UrlServiceV1 + "eventos/categorias")
            .pipe(catchError(super.seviceError));
        }

        registrarEvento(evento: Evento) : Observable<Evento[]>{
            return this.http
            .post(this.UrlServiceV1 + "evento", evento, super.ObterAuthHeaderJson())
            .pipe(map(super.extractData),catchError(super.seviceError));
        }
}