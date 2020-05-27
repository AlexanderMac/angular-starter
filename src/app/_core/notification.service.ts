import * as Toastr from 'toastr';

const WARNING_OPTS = { timeOut: 10000 };
const ERROR_OPTS = { timeOut: 15000 };

export class NotificationService {
  constructor() {
    Toastr.options.closeButton = true;
    Toastr.options.timeOut = 3000;
    Toastr.options.escapeHtml = true;
    Toastr.options.preventDuplicates = true;
  }

  success(msg: string): void {
    Toastr.success(msg);
  }

  info(msg: string): void {
    Toastr.info(msg);
  }

  warning(title: string, err?: any): void {
    if (err) {
      let errMsg = this._getErrorMessage(err);
      Toastr.warning(errMsg, title, WARNING_OPTS);
    } else {
      Toastr.warning(title, null, WARNING_OPTS);
    }
  }

  error(title: string, err?: any): void {
    if (err) {
      let errMsg = this._getErrorMessage(err);
      Toastr.error(errMsg, title, ERROR_OPTS);
    } else {
      Toastr.error(title, null, ERROR_OPTS);
    }
  }

  warningOrError(title: string, err?: any): void {
    if (!err || !err.status || err.status < 500) {
      this.warning(title, err);
    } else {
      this.error(title, err);
    }
  }

  private _getErrorMessage(ngErr: any): string {
    let errMsg = '';
    if (ngErr && ngErr.error) {
      let err = ngErr.error;
      if (err.message) {
        errMsg += err.message;
      }
      if (err.details) {
        errMsg += err.details;
      }
    }
    return errMsg;
  }
}
