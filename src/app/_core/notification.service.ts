import * as Toastr from 'toastr';

export class NotificationService {
  constructor() {
    Toastr.options.closeButton = true;
    Toastr.options.closeDuration = 1000;
  }

  success(msg: string): void {
    Toastr.success(msg);
  }

  info(msg: string): void {
    Toastr.info(msg);
  }

  warning(err: any): void {
    Toastr.warning(err);
  }

  error(err: any): void {
    Toastr.error(err);
  }
}
