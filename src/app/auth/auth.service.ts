import { Injectable, WritableSignal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticatedSignal: WritableSignal<boolean> = signal(this.isAuthenticated());

  constructor(
    private router: Router
  ) { }

  login(username: string, password: string): Observable<boolean> {
    if (username === "admin" && password === "admin") {
      this.updateAuthenticated(true);
    } else {
      this.updateAuthenticated(false);
    }
    return of(this.isAuthenticated());
  }

  logout() {
    this.updateAuthenticated(false);
    this.router.navigateByUrl('login');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  updateAuthenticated(isAuthenticated: boolean): void {
    localStorage.setItem('isAuthenticated', `${isAuthenticated}`);
    this.isAuthenticatedSignal.set(isAuthenticated);
  }
}
