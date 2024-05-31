import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
    private router: Router
  ) {
    this.username = "";
    this.password = "";
  }

  ngOnInit() { }

  async onLogin() {
    if (this.username === "admin" && this.password === "admin") {
      const toast = await this.toastController.create({
        message: 'Login successful!!',
        duration: 5000,
        position: 'bottom'
      });
      await toast.present().then(() => {
        this.router.navigateByUrl("/auth/tabs/tab1").then(() => {
          console.log("navigated");
        })
      });
    } else {
      const toast = await this.toastController.create({
        message: 'Invalid credentials',
        duration: 5000,
        position: 'bottom'
      });
      await toast.present();
    }
  }

}
