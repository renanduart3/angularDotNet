import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../services/evento.service';
import { Evento } from '../models/Evento';
import { BsModalService, BsLocaleService, BsModalRef, BsDatepickerConfig } from 'ngx-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ToastrService } from 'ngx-toastr';

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
  tipoAcao: string;
  loading = false;

  constructor(
    private eventoService: EventoService
    , private modalService: BsModalService
    , private fb: FormBuilder
    , private localeService: BsLocaleService
    , private toastr: ToastrService
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit() {
    this.loading = true;
    this.getEventos();
    this.loading = false;
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


  editarEvento(evento: Evento, template: any) {
    this.tipoAcao = 'put';
    this.openModal(template);
    this.evento = evento;
    this.newEventosForm.patchValue(evento);
  }
  deletarEvento(evento: Evento) {
    if (confirm('deseja deletar??')) {
      this.eventoService.deleteEvento(evento.id)
        .subscribe(
          () => {
            this.toastr.success('Evento deletado!', 'Delete');
            this.getEventos();
          },
          (err) => {
            console.log(err);
          });


    } 
  }


  novoEvento(template: any) {
    this.tipoAcao = 'post';
    this.openModal(template);
  }

  salvarEventoForm(template: any) {
    if (this.tipoAcao === 'post') {

      if (this.newEventosForm.valid) {
        this.evento = Object.assign({}, this.newEventosForm.value);
        this.eventoService.postNovoEvento(this.evento)
          .subscribe((evento: Evento) => {
            this.toastr.success('Hello world!', 'Toastr fun!');
            this.getEventos();
            template.hide();
          }, (error) => {
            this.toastr.warning('Ocorreu um erro', 'Toastr fun!');
          });
      }
    } else {
      if (this.newEventosForm.valid) {
        this.evento = Object.assign({ id: this.evento.id }, this.newEventosForm.value);
        this.eventoService.putEvento(this.evento)
          .subscribe(() => {
            this.toastr.success('Evento Alterado', 'Toastr fun!');
            this.getEventos();
            template.hide();
          }, (error) => {
            console.log(error);
            this.toastr.warning('Ocorreu um erro', 'Toastr fun!');
          });
      }
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
