import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private translate: TranslateService) {
    console.log('IN Translate');
    this.translate.addLangs(['en']);
    translate.setDefaultLang('en');
    translate.use('en');
    // other common translate setup
  }
  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
  getValue(key: string) {
    // console.log(this.translate);
    // console.log(this.translate.instant(key));

    return this.translate.instant(key);
  }
  // Additional methods or properties as needed
}
