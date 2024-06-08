import { Component, OnInit, effect } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  public confirmLogoutAlertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => this.authService.closeConfirmLogoutAlert(),
    },
    {
      text: 'Logout',
      role: 'confirm',
      handler: () => this.authService.logout(),
    },
  ];
  isConfirmLogoutAlertOpen: boolean = false;

  constructor(
    private authService: AuthService
  ) {
    effect(() => {
      this.isConfirmLogoutAlertOpen = this.authService.isConfirmLogoutAlertOpen();
    });

  }

  ngOnInit(): void {
  }

}
