import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() header = false;
  @Input() title: String = '';
  @Input() collapsable = false;

  bodyClass = 'custom-card-content';
  bodyCollapsed = false;
  expansionClass = 'expansion-indicator';
  constructor() {}

  ngOnInit() {}

  toggle() {
    if (this.bodyCollapsed === true) {
      this.bodyCollapsed = false;
      this.bodyClass = 'custom-card-content';
      this.expansionClass = 'expansion-indicator';
    } else {
      this.bodyCollapsed = true;
      this.bodyClass = 'custom-card-content-collapse';
      this.expansionClass = 'expansion-indicator transform-225';
    }
  }
}
