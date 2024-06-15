import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

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
    private auth: AuthService,
    public translate: TranslateService,
    private loadingCtrl: LoadingController
  ) {
    this.username = "";
    this.password = "";
  }

  ngOnInit() { }

  async onLogin() {
    this.loadingCtrl.create({ message: 'Logging in...' }).then(loader => {
      loader.present();
      this.auth.login(this.username, this.password).subscribe({
        next: (iaAuthenticated: boolean) => {
          if (iaAuthenticated) {
            this.toastController.create({
              message: this.translate.instant('LOGIN_PAGE.LOGIN_SUCCESS'),
              duration: 5000,
              position: 'bottom'
            }).then(toast => toast.present().then(() => this.router.navigateByUrl("/auth/add-entry")));
          } else {
            this.toastController.create({
              message: this.translate.instant('LOGIN_PAGE.INVALID_LOGIN'),
              duration: 5000,
              position: 'bottom'
            }).then(toast => toast.present());
          }
        },
        complete: () => loader.dismiss()
      });
    });
  }

}
