import { Component, OnInit, ViewChild, effect } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TAB_DETAILS, TabDetail } from './tabDetails';
import { IonTabs } from '@ionic/angular';

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
  title: string = "";
  tabDetails: TabDetail[] = TAB_DETAILS;
  @ViewChild('tabs') tabs!: IonTabs;

  constructor(
    private authService: AuthService
  ) {
    effect(() => {
      this.isConfirmLogoutAlertOpen = this.authService.isConfirmLogoutAlertOpen();
    });
  }

  ngOnInit(): void {
  }

  onTabChange(tabName: string) {
    this.title = this.tabDetails.find(tabDetail => tabDetail.tabName === tabName)?.title as string;
  }

}
