import { Component, EffectRef, OnInit, effect } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { DataService } from 'src/app/services/data.service';
import { LANGUAGES, Language } from './languages.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  languages: Language[] = LANGUAGES;
  public clearStorageAlertButtons = [
    {
      text: 'No, Cancel',
      role: 'cancel'
    },
    {
      text: 'YES, Clear Storage',
      role: 'confirm',
      handler: () => this.clearStorage(),
    },
  ];
  public logoutAlertButtons = [
    {
      text: 'No, Cancel',
      role: 'cancel',
    },
    {
      text: 'Yes, Logout',
      role: 'confirm',
      handler: () => this.logout(),
    },
  ];
  public isLoggedIn: boolean = false;
  public isAuthenticatedEffet: EffectRef = effect(() => {
    this.isLoggedIn = this.authService.isAuthenticatedSignal();
    this.isAuthenticatedEffet.destroy();
  });

  constructor(
    private authService: AuthService,
    private menuCtrl: MenuController,
    private dataService: DataService,
    private translate: TranslateService
  ) { }


  ngOnInit() { }

  changeLanguage(selectedLanguageIndex: number) {
    (this.languages.find(language => language.isSelected) as Language).isSelected = false;
    this.translate.use(this.languages[selectedLanguageIndex].langCode);
    this.languages[selectedLanguageIndex].isSelected = true;
  }

  clearStorage() {
    this.dataService.resetStorage();
    this.menuCtrl.close();
  }

  logout() {
    this.authService.logout();
    this.menuCtrl.close();
  }

}
