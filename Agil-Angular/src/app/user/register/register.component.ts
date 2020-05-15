import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmedValidator } from 'src/app/utils/confirmed.validator';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  user: User;

  constructor(public formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      passwords: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(3)]],
        confirmpassword: ['', [Validators.required, Validators]],
      }, {
        validator: this.compararSenhas
      })
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  compararSenhas(fb: FormGroup) {
    const senhaDigitada = fb.get('confirmpassword');

    if (senhaDigitada.errors == null || 'mismatch' in senhaDigitada.errors) {
      if (fb.get('password').value !== senhaDigitada.value) {
        senhaDigitada.setErrors({ mismatch: true });
      } else {
        senhaDigitada.setErrors(null);
      }
    }


  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.form.value));

    this.registerUser();
  }

  registerUser() {
    this.user = Object.assign({
      password: this.form.get('passwords.password').value
    },
      this.form.value);
    console.log(this.user);
    this.authService.register(this.user).subscribe(
      () => {
        this.router.navigate(['/user/login']);
        this.toast.success('Cadastrado com sucesso');
      }, error => {
        const erro = error.error;
        erro.forEach(element => {
          switch (element.code) {
            case 'DuplicateUserName':
              this.toast.error('Cadastro Duplicado!');
              break;
            default:
              this.toast.error(`Erro no Cadatro! CODE: ${element.code}`);
              break;
          }
        });
      }

    );
  }
}
