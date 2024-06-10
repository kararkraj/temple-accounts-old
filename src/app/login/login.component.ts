import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(
    private toastController: ToastController,
    private router: Router,
    private auth: AuthService
  ) {
    this.username = "";
    this.password = "";
  }

  ngOnInit() { }

  onLogin() {
    this.auth.login(this.username, this.password).subscribe({
      next: (iaAuthenticated: boolean) => {
        if (iaAuthenticated) {
          this.toastController.create({
            message: 'Login successful!!',
            duration: 5000,
            position: 'bottom'
          }).then(toast => toast.present().then(() => this.router.navigateByUrl("/auth/add-entry")));
        } else {
          this.toastController.create({
            message: 'Invalid credentials',
            duration: 5000,
            position: 'bottom'
          }).then(toast => toast.present());
        }
      }
    });
  }

}
