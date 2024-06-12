import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  public clearStorageAlertButtons = [
    {
      text: 'No, Cancel',
      role: 'cancel'
    },
    {
      text: 'YES, Clear Storage',
      role: 'confirm',
      handler: () => this.clearStorage(),
    },
  ];
  public logoutAlertButtons = [
    {
      text: 'No, Cancel',
      role: 'cancel',
    },
    {
      text: 'Yes, Logout',
      role: 'confirm',
      handler: () => this.logout(),
    },
  ];

  constructor(
    private authService: AuthService,
    private menuCtrl: MenuController,
    private dataService: DataService
  ) { }


  ngOnInit() { }

  changeLanguage() {

  }

  clearStorage() {
    this.dataService.resetStorage();
    this.menuCtrl.close();
  }

  logout() {
    this.authService.logout();
    this.menuCtrl.close();
  }

}
