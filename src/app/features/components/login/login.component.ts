import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    RouterLink,
    MatSnackBarModule,
    FormsModule,
    SnackbarComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  checked = new FormControl('', Validators.required);

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    console.log('LoginComponent initialized'); // Log

    if (this.authService.isAuthenticated()) {
      console.log('User already authenticated, redirecting to dashboard'); // Log
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    if (this.email.valid && this.password.valid) {
      this.authService
        .login(this.email.value!, this.password.value!)
        .subscribe({
          next: (response) => {
            console.log(
              'Login bem-sucedido, redirecionando para dashboard',
              response
            ); // Log
            this.router.navigate(['/dashboard']);
            SnackbarComponent.showError(this.snackBar, 'Login efetuado com sucesso', 'X', 'success');
          },
          error: (err) => {
            SnackbarComponent.showError(this.snackBar, 'Acesso negado!', 'X', 'error');
            console.error('Falha no login', err);
          },
        });
    }
  }

  getErrorEmailMessage() {
    if (this.email.hasError('required')) {
      return 'Preencha seu email';
    }

    return this.email.hasError('email') ? 'Email inválido' : '';
  }

  getErrorPasswordMessage() {
    if (this.password.hasError('required')) {
      return 'Preencha sua senha';
    }

    return this.password.hasError('minlength')
      ? 'Senha inválida. Mínimo 6 caracteres'
      : '';
  }
}
