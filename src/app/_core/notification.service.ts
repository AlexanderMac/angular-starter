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

  warning(msg: string, err?: any): void {
    let fullMsg = this._getFullErrorMessage(msg, err);
    Toastr.warning(fullMsg);
  }

  error(msg: string, err?: any): void {
    let fullMsg = this._getFullErrorMessage(msg, err);
    Toastr.error(fullMsg);
  }

  warningOrError(msg: string, err?: any): void {
    let fullMsg = this._getFullErrorMessage(msg, err);
    if (!err.status || err.status < 500) {
      Toastr.warning(fullMsg);
    } else {
      Toastr.error(fullMsg);
    }
  }

  private _getFullErrorMessage(msg: string, ngErr?: any): string {
    let fullMsg = msg;
    if (ngErr && ngErr.error) {
      let err = ngErr.error;
      if (err.message) {
        fullMsg += '<br>' + err.message;
      }
      if (err.details) {
        fullMsg += '<br>' + err.details;
      }
    }
    return fullMsg;
  }
}
