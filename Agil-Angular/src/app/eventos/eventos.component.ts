import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../services/evento.service';
import { Evento } from '../models/Evento';
import { BsModalService, BsLocaleService, BsModalRef, BsDatepickerConfig } from 'ngx-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  colorTheme = 'theme-dark-blue';
  bsConfig: Partial<BsDatepickerConfig>;

  eventos: Evento[];
  evento: Evento;
  mostrarImagem = false;
  modalRef: BsModalRef;
  newEventosForm: FormGroup;
  padraoQtdPessoas = '^[0-9]*$';


  constructor(
    private eventoService: EventoService
    , private modalService: BsModalService
    , private fb: FormBuilder
    , private localeService: BsLocaleService
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit() {
    this.getEventos();
    this.validation();
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme, dateInputFormat: 'DD-MM-YYYY' });
  }

  validation() {
    this.newEventosForm = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      local: ['', [Validators.required]],
      dataEvento: ['', [Validators.required]],
      qtdPessoas: ['', [Validators.required, Validators.pattern(this.padraoQtdPessoas)]],
      imagemURL: [''],
      telefone: [''],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  openModal(template: any) {
    this.newEventosForm.reset();
    template.show();
  }


  editarEvento(eventoId: number) {
    // this.evento = this.eventoService.getEventosById(eventoId).subscribe((evento: Evento) => {

    //  }, () => { });
  }

  salvarEventoForm(template: any) {
    if (this.newEventosForm.valid) {
      this.evento = Object.assign({}, this.newEventosForm.value);
      this.eventoService.postNovoEvento(this.evento)
        .subscribe((evento: Evento) => {
          console.log(evento);
          this.getEventos();
          template.hide();
        }, (error) => {
          console.log(error);
        });
    }
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
