import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventosComponent } from './eventos/eventos.component';
import { PalestranteComponent } from './palestrante/palestrante.component';
import { ContatoComponent } from './contato/contato.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { UserComponent } from './user/user.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { AuthGuard } from './guards/auth.guard';
import { Role } from './models/Role';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent }
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'palestrantes', component: PalestranteComponent, canActivate: [AuthGuard] },
  { path: 'eventos', component: EventosComponent, canActivate: [AuthGuard] },
  { path: 'contatos', component: ContatoComponent, canActivate: [AuthGuard] },
  { path: '**', component: LoginComponent },
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
