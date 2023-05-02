import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/http/AuthenticationService/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  declare signUpForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService
  ) {}
  ngOnInit() {
    this.signUpFormInit();
  }
  private signUpFormInit(): void {
    this.signUpForm = this.formBuilder.group({
      full_name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: [
        '',
        [Validators.required, Validators.minLength(8)],
      ],
    });
  }
  signUp() {
    if (this.signUpForm.valid) {
      this.auth.signUp(this.signUpForm.value);
    }
    this.signUpForm.markAllAsTouched();
  }
}
