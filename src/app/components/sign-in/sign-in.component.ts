import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/http/AuthenticationService/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  declare signInForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService
  ) {}
  ngOnInit() {
    this.signInFormInit();
  }
  private signInFormInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  signIn() {
    if (this.signInForm.valid) {
      this.auth.signIn(this.signInForm.value);
    }
    this.signInForm.markAllAsTouched();
  }
}
