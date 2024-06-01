import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;

  constructor() { }

  login(username: string, password: string): Observable<boolean> {
    if (username === "admin" && password === "admin") {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
    return of(this.authenticated());
  }

  logout() {
    this.isAuthenticated = false;
  }

  authenticated() {
    return this.isAuthenticated;
  }
}
