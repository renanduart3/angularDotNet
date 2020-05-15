import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDropdownModule, TooltipModule, ModalModule, BsDatepickerModule } from 'ngx-bootstrap';
import { EventosComponent } from './eventos/eventos.component';
import { NavComponent } from './nav/nav.component';
import { DateTimePipe } from './helpers/date-time.pipe';
import { EditComponent } from './eventos/edit/edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PalestranteComponent } from './palestrante/palestrante.component';
import { ContatoComponent } from './contato/contato.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { TestUserComponent } from './user/test-user/test-user.component';
import { AdminComponent } from './admin/admin.component';
import { EventoService } from './services/evento.service';
import { AuthInterceptor } from './guards/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    EventosComponent,
    NavComponent,
    DateTimePipe,
    EditComponent,
    DashboardComponent,
    PalestranteComponent,
    ContatoComponent,
    UserComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    TestUserComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    EventoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
