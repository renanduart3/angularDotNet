import { Component, OnInit, asNativeElements, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @ViewChild('menuSuperior') menuTopo: ElementRef<HTMLInputElement>;

  constructor(
    private toast: ToastrService,
    private authService: AuthService,
    public router: Router) { }

  ngOnInit() {
    // if (this.router.url == '/user/login') {
    //   this.menuTopo.nativeElement.hidden = true;
    // }
  }

  showMenu() {
    return this.router.url !== '/user/login';
  }

  // loggedIn() {
  //   return this.authService.loggedIn();
  // }

  entrar() {
    this.router.navigate(['/user/login']);
  }

  // logout() {
  //   localStorage.removeItem('token');
  //   this.toastr.show('Log Out');
  //   this.router.navigate(['/user/login']);
  // }
  loggedIn() {
    return this.authService.isLoggedIn();
  }

  userName() {
    return sessionStorage.getItem('username');
  }

  logout() {
    localStorage.removeItem('token');
    this.toast.show('Log Out');
    this.router.navigate(['/user/login']);
  }

}
