import { Component, Injector } from '@angular/core';
import { AppInjector } from './lib/classes/AppInjector';
import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild,
  state,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state(
        'in',
        style({
          opacity: 1,
        })
      ),
      transition('* => *', [
        style({
          opacity: 0,
        }),
        animate(1000),
      ]),
    ]),
  ],
})
export class AppComponent {
  title = 'dt-app3';
  constructor(private injector: Injector) {
    AppInjector.setInjector(injector);
  }
  phoneNumber: any = '';
}
