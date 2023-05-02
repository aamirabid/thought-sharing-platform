import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { SignInMapper } from '../Interfaces/Auth/SignIn';
import { SignUpMapper } from '../Interfaces/Auth/SignUp';
import { SignOutMapper } from '../Interfaces/Auth/SignOut';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpService, private router: Router) {}

  signUp(payload?: any): void {
    const subscriber = this.http
      .post('sign-up', payload)
      .pipe(map((response) => response as SignUpMapper.SignUpModel));
    subscriber.subscribe((response) => {
      if (response.data.accessToken) {
        alert('Signed Up Successfully, Please login Now');
        this.router.navigate(['']);
      }
    });
  }
  signIn(payload?: any): void {
    const subscriber = this.http
      .post('sign-in', payload)
      .pipe(map((response) => response as SignInMapper.SignInModel));
    subscriber.subscribe((response) => {
      console.log(response);

      if (response.data.accessToken) {
        this.http.setToken(response.data.accessToken);
        if (this.http.verifyToken()) {
          this.router.navigate(['auth/notes']);
        }
      }
    });
  }

  signOut(): void {
    const subscriber = this.http
      .delete('auth/sign-out')
      .pipe(map((response) => response as SignOutMapper.SignOutModel));
    subscriber.subscribe((response) => {
      if (response.data) {
        this.http.removeToken();
        if (!this.http.verifyToken()) {
          this.router.navigate(['']);
        }
      }
    });
  }
}
