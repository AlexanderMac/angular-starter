type CustomError = Error & {
  status?: number
  error?: {
    message: string
    details: string
  }
}

export class NotificationService {
  success(msg: string): void {
    alert(msg)
  }

  info(msg: string): void {
    alert(msg)
  }

  warning(title: string, err?: CustomError): void {
    if (err) {
      const errMsg = this.getErrorMessage(err)
      alert(title + '\n' + errMsg)
    } else {
      alert(title)
    }
  }

  error(title: string, err?: CustomError): void {
    if (err) {
      const errMsg = this.getErrorMessage(err)
      alert(title + '\n' + errMsg)
    } else {
      alert(title)
    }
  }

  warningOrError(title: string, err?: CustomError): void {
    if (!err || !err.status || err.status < 500) {
      this.warning(title, err)
    } else {
      this.error(title, err)
    }
  }

  private getErrorMessage(errOrString: CustomError): string {
    let errMsg = ''
    if (errOrString) {
      if (errOrString.error) {
        const err = errOrString.error
        if (err.message) {
          errMsg += err.message
        }
        if (err.details) {
          errMsg += err.details
        }
      } else if (errOrString.message) {
        errMsg = errOrString.message
      } else {
        errMsg = errOrString.toString()
      }
    }
    return errMsg
  }
}
