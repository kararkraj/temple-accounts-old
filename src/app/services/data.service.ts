import { Injectable, WritableSignal, signal } from '@angular/core';
import { Entry } from '../interfaces/entry.interface';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _storage!: Storage;
  public entriesUpdatedSignal: WritableSignal<number> = signal(0);

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;

    // When the storage is instantiated for the first time, entries will be null and null value can cause errors.
    // Hence instantiate with initial values
    if (await this._storage.get('entries') === null) {
      this.resetStorage();
    }
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  addEntry(entry: Entry): Observable<Entry> {
    return new Observable((observer) => {
      this._storage.get('entries').then(entries => {
        entries.push(entry);
        this._storage.set('entries', entries);
        this._storage.set('lastStoredId', entry.id);
        observer.next(entry);
        this.triggerEntriesUpdatedEvent();
        observer.complete();
      });
    });
  }

  getEntries(): Promise<Entry[]> {
    return this._storage.get('entries');
  }

  resetStorage() {
    this._storage.set('lastStoredId', 0);
    this._storage.set('entries', []);
    this.triggerEntriesUpdatedEvent();
  }

  triggerEntriesUpdatedEvent() {
    this.entriesUpdatedSignal.update((value: number) => ++value);
  }
}
