import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Evento } from '../models/Evento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private urlAPI = 'http://localhost:5000/api/eventos/';

  constructor(private http: HttpClient) { }


  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.urlAPI);
  }

  getEventosByTema(tema: string): Observable<Evento[]>  {
    return this.http.get<Evento[]>(`${this.urlAPI}/getBytema/${tema}`);
  }

  getEventosById(id: number): Observable<Evento>  {
    return this.http.get<Evento>(`${this.urlAPI}/${id}`);
  }
}
