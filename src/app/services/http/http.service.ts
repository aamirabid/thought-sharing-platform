import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private errorMessages: any = {
    404: 'Request Not Found On Server',
    403: 'Access Denied',
  };
  private declare authKey: string;
  private declare baseUrl: string;
  private declare accessToken: String;
  constructor(private route: Router, private client: HttpClient) {
    this.authKey = environment.authKey;
    this.baseUrl = environment.baseUrl;
  }

  get(endPoint: string, params?: any): Observable<any> {
    const data = {
      params,
      headers: this.getAuthHeader(),
    };
    return this.client
      .get(this.baseUrl + endPoint, data)
      .pipe(retry(1), catchError(this.errorHandler.bind(this)));
  }

  post(endPoint: string, payload?: any): Observable<any> {
    return this.client
      .post(this.baseUrl + endPoint, payload, {
        headers: new HttpHeaders({
          'content-type': 'application/json; charset=utf-8',
          'Accept': 'application/json; charset=utf-8',
        }),
      })
      .pipe(retry(1), catchError(this.errorHandler.bind(this)));
  }

  postWithAuth(endPoint: string, payload?: any): Observable<any> {
    return this.client
      .post(this.baseUrl + endPoint, payload, {
        headers: this.getAuthHeader(),
      })
      .pipe(retry(1), catchError(this.errorHandler.bind(this)));
  }

  put(endPoint: string, payload?: any): Observable<any> {
    return this.client
      .put(this.baseUrl + endPoint, payload, {
        headers: this.getAuthHeader(),
      })
      .pipe(retry(1), catchError(this.errorHandler.bind(this)));
  }

  patch(endPoint: string, payload?: any): Observable<any> {
    return this.client
      .patch(this.baseUrl + endPoint, payload, {
        headers: this.getAuthHeader(),
      })
      .pipe(retry(1), catchError(this.errorHandler.bind(this)));
  }

  delete(endPoint: string, params?: any): Observable<any> {
    const data = {
      params,
      headers: this.getAuthHeader(),
    };
    return this.client
      .delete(this.baseUrl + endPoint, data)
      .pipe(retry(1), catchError(this.errorHandler.bind(this)));
  }

  verifyToken(): boolean {
    const token = localStorage.getItem(this.authKey);
    if (!token) {
      return false;
    }
    const item = JSON.parse(atob(token));
    const now = new Date();
    if (now.getTime() > item.expiration) {
      localStorage.removeItem(this.authKey);
      return false;
    }
    return true;
  }

  setToken(token: any): void {
    this.accessToken = token;
    localStorage.setItem(this.authKey, btoa(JSON.stringify(token)));
  }

  removeToken(): boolean {
    localStorage.clear();
    return true;
  }
  private errorHandler(response: any) {
    if (response.status === 401) {
      this.removeToken();
      this.route.navigate(['']);
    }
    const error = response.error;
    const keys = Object.keys(error);
    const key = keys[0];
    let message: string = error[key];
    if (error[key] instanceof Array) {
      message = error[key][0];
    }
    return throwError(() => {
      if (message === '<') {
        const messageError: string = this.errorMessages[response.status];
        message = messageError ? messageError : 'ERROR';
      }
      alert(`${response.status}: ${message}`);
      return error;
    });
  }

  private getAuthHeader(): { [header: string]: string | string[] } {
    const auth = localStorage.getItem(this.authKey) ?? null;

    if (auth) {
      const token = JSON.parse(atob(auth));
      return {
        authorization: `${token.token ?? this.accessToken}`,
      };
    }
    return {};
  }
}
