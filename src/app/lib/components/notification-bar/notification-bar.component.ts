import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MessageNotificationService } from 'src/app/lib/service/message-notification.service';
import { Subscription } from 'rxjs';
import {
  NotificationMessage,
  MessageStatus,
} from 'src/app/lib/classes/NotificationMessage';

@Component({
  selector: 'notification-bar',
  templateUrl: 'notification-bar.component.html',
  styleUrls: ['notification-bar.component.scss'],
})
export class NotificationBarComponent implements OnInit, OnDestroy {
  message!: NotificationMessage;
  cssClass = 'no-display';
  icon!: string;
  messages!: NotificationMessage[];
  subscription: Subscription;
  constructor(private _notfnService: MessageNotificationService) {
    this.subscription = this._notfnService
      .getMessage()
      .subscribe((msgs: any) => {
        this.messages = [];
        if (msgs.length && msgs.length > 0) {
          this.message = msgs[0];
          this.messages = msgs.slice();
        } else {
          this.messages.push(msgs);
          this.message = msgs;
        }

        if (this.message.type === MessageStatus.success) {
          this.cssClass = 'alert alert-success';
          this.icon = 'check_circle';
        } else if (this.message.type === MessageStatus.info) {
          this.cssClass = 'alert alert-info ';
          this.icon = 'info';
        } else if (this.message.type === MessageStatus.error) {
          this.cssClass = 'alert alert-danger ';
          this.icon = 'warning';
        } else if (this.message.type === MessageStatus.warning) {
          this.cssClass = 'alert alert-warning ';
          this.icon = 'priority_high';
        } else {
          this.cssClass = 'no-display';
        }
        // this._cdref.markForCheck();
      });
  }
  handleClick(arg: any) {
    this._notfnService.invokeAction(arg);
  }

  ngOnInit() {}

  close() {
    this.cssClass = 'no-display';
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
