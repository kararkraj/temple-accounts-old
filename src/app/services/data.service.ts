import { Injectable } from '@angular/core';
import { Entry } from '../interfaces/entry.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private entries: Entry[] = [];

  constructor() { }

  addEntry(entry: Entry): Observable<Entry> {
    this.entries.push(entry);
    return of(entry);
  }

  getEntries() {
    return this.entries;
  }
}
