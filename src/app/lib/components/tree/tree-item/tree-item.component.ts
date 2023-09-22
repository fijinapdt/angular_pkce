import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'tree-item',
  templateUrl: './tree-item.component.html',
  styleUrls: ['./tree-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeItemComponent implements OnInit {
  @Input() panelCount?: any;
  @Input() panelText?: any;
  @Input() expanded = false;
  @Input() showPanelIcon = true;
  @Input() icon?: string;
  @Input() panelIcon?: any;
  constructor() {}

  ngOnInit() {}
}
