import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'collapse-panel',
  templateUrl: './collapse-panel.component.html',
  styleUrls: ['./collapse-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollapsePanelComponent implements OnInit {
  @Input() panelCount: any;
  @Input() panelText: any;
  @Input() expanded = false;
  @Input() showPanelIcon = true;
  @Input() icon!: string;
  @Input() panelIcon = false;
  constructor() {}

  ngOnInit() {}
}
