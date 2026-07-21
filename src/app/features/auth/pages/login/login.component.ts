import { AuthService } from '@core/auth/services/auth.service';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { InputErrComponent, ButtonComponent } from '@/app/shared/components';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputErrComponent, ButtonComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  loginSubscription: Subscription = new Subscription(); // to avoid err when unsubscribe
  loading = signal(false);
  showPassword = signal(false);

  loginForm = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(3)]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
      ],
    ],
  });

  // loginForm = new FormGroup({
  //   login: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   password: new FormControl('', [
  //     Validators.required,
  //     Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  //   ]),
  // });

  submitHandler() {
    if (this.loginForm.valid) {
      // cancel old request
      this.loginSubscription.unsubscribe();
      // send request to backend
      this.loading.set(true);
      this.authService.signin(this.loginForm.value).subscribe({
        next: (res) => {
          // display success message in a toast
          // store token and user's data in local storage
          localStorage.setItem('rippleToken', res.data.token);
          localStorage.setItem('rippleUser', JSON.stringify(res.data.user));
          // navigate to home
          this.router.navigate(['/home']);
        },
        error: (err: HttpErrorResponse) => {
          this.loading.set(false);
          // display err message in a toast
          console.log(err);
        },
        complete: () => {
          this.loading.set(false);
        },
      });
    } else {
      // show all problematic fields
      this.loginForm.markAllAsTouched();
    }
  }
}
