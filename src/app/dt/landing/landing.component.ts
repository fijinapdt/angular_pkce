import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/service/TranslationService';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  landingForm!: FormGroup;

  constructor(private _translationService: TranslationService) {}
  ngOnInit(): void {
    this.landingForm = new FormGroup({
      textField: new FormControl('', [
        Validators.required,
        Validators.minLength(5), // Minimum length of 5
        Validators.maxLength(20),
      ]),
    });
  }

  onLanguageChange(lang: string) {
    this._translationService.changeLanguage(lang);
  }

  getData() {
    console.log(this._translationService);

    return this._translationService.getValue('main.address');
  }
}
