import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-close',
  templateUrl: 'close.component.html',
  styleUrls: ['close.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
