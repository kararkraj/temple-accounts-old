import { Component, OnInit } from '@angular/core';
import { Entry } from '../interfaces/entry.interface';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  entries: Entry[] = [];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.entries = this.dataService.getEntries();
  }

}
