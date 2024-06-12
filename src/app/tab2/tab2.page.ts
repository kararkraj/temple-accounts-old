import { Component, EffectRef, OnInit, effect } from '@angular/core';
import { Entry } from '../interfaces/entry.interface';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  entries: Entry[] = [];
  updatedEntriesEffect: EffectRef = effect(() => {
    this.dataService.entriesUpdatedSignal();
    this.getEntries();
  });

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void { }

  getEntries() {
    this.dataService.getEntries().then((entries: Entry[]) => this.entries = entries);
  }

}
