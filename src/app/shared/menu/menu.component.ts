import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  constructor(
    private authService: AuthService,
    private menuCtrl: MenuController,
    private dataService: DataService
  ) { }

  public confirmClearStorageButtons = [
    {
      text: 'Cancel',
      role: 'cancel'
    },
    {
      text: 'YES, Clear Storage',
      role: 'confirm',
      handler: () => this.clearStorage(),
    },
  ];

  ngOnInit() {}

  logout() {
    this.authService.openConfirmLogoutAlert();
    this.menuCtrl.close();
  }

  changeLanguage() {
    
  }

  clearStorage() {
    this.dataService.resetStorage();
    this.menuCtrl.close();
  }

}
