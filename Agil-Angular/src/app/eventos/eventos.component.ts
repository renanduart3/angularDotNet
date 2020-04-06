import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../services/evento.service';
import { Evento } from '../models/Evento';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventos: Evento[];
  mostrarImagem = false;
  modalRef: BsModalRef;


  constructor(private eventoService: EventoService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getEventos();

  }

  editarEvento(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  getEventos() {
    this.eventoService.getEventos()
      .subscribe(
        (_eventos: Evento[]) => {
          return this.eventos = _eventos;
        },
        error => {
          console.log(error);
        });
  }

}
