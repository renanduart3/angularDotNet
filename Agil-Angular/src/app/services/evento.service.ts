import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Evento } from '../models/Evento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService {


  constructor(private http: HttpClient) { }

  private urlAPI = 'http://localhost:5000/api/eventos/';


  postNovoEvento(evento: Evento) {
    return this.http.post(this.urlAPI, evento);
  }

  deleteEvento(id: number) {
    // const params = new HttpParams()
    //   .append('id', id.toString());

    return this.http.delete(this.urlAPI + id);
  }

  putEvento(evento: Evento) {
    return this.http.put(`${this.urlAPI}${evento.id}`, evento);
  }

  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.urlAPI);
  }

  getEventosByTema(tema: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.urlAPI}/getBytema/${tema}`);
  }

  getEventosById(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.urlAPI}/${id}`);
  }
}
