export enum MessageStatus {
  error = 1,
  warning = 2,
  success = 3,
  info = 4,
  none = 5,
}

export class NotificationMessage {
  type: MessageStatus | undefined;
  text: string = '';
}
