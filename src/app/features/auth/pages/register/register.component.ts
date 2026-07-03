import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputErrComponent, ButtonComponent } from '@shared/components';
import { AuthService } from '@core/auth/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputErrComponent, ButtonComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loading = signal(false);
  registerSubscription: Subscription = new Subscription(); // to avoid err when unsubscribe

  registerForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      username: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfBirth: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
      ]),
      rePassword: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
      ]),
    },
    { validators: [this.confirmPassword], updateOn: 'change' },
  );

  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;

    if (rePassword !== password && rePassword !== '') {
      // put error to the contro
      group.get('rePassword')?.setErrors({ mismatch: true });
      // put error to the form itself
      return { mistatch: true };
    } else {
      return null;
    }
  }

  submitHandler() {
    if (this.registerForm.valid) {
      //cancel old requests
      this.registerSubscription.unsubscribe();
      // submit the form
      this.loading.set(true);
      this.registerSubscription = this.authService.signup(this.registerForm.value).subscribe({
        next: (res) => {
          // show recieved message in toast
          console.log(res);
          // navigate to home
          this.router.navigate(['/login']);
        },
        error: (err: HttpErrorResponse) => {
          this.loading.set(false);
          // show recieved message in toast
          console.log(err.message);
        },
        complete: () => {
          this.loading.set(false);
        },
      });
    } else {
      // all the problematic fields show error
      this.registerForm.markAllAsTouched();
    }
  }
}
