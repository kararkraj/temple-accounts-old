import { Component, OnInit, ViewChild } from '@angular/core';
import { TAB_DETAILS, TabDetail } from './tabDetails';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  isConfirmLogoutAlertOpen: boolean = false;
  title: string = "";
  tabDetails: TabDetail[] = TAB_DETAILS;
  @ViewChild('tabs') tabs!: IonTabs;

  constructor() { }

  ngOnInit(): void {
  }

  onTabChange(tabName: string) {
    this.title = this.tabDetails.find(tabDetail => tabDetail.tabName === tabName)?.title as string;
  }

}
