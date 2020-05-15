import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  model: any[];
  loading = false;

  constructor(private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastrService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['/dashboard']);
    }
  }
  get f() { return this.form.controls; }

  login() {
    this.loading = true;
    const user = this.form.get('userName').value;
    const pass = this.form.get('password').value;

    this.authService.login(user, pass)
      .subscribe(
        () => {
          this.router.navigate(['/dashboard']);
          this.toast.success('Logado com Sucesso');
          this.loading = false;
        },
        error => {
          this.toast.error('Falha ao tentar Logar');
          this.loading = false;
        }
      );
      
  }

  onSubmit() {

  }

}
