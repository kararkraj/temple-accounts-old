import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    // DataService injector is required to create service and storage instances
    private dataService: DataService,
    public translate: TranslateService
  ) {
    // Register translation languages
    translate.addLangs(['en', 'kn']);
    // Set default language
    translate.setDefaultLang('en');
  }
}
