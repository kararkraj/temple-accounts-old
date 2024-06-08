import { Component, OnInit } from '@angular/core';
import { Entry } from '../interfaces/entry.interface';
import { DataService } from '../services/data.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  entries: Entry[] = [];

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.entries = this.dataService.getEntries();
  }

  logout() {
    this.authService.openConfirmLogoutAlert();
  }

}
