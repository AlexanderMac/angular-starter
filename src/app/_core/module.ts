import { NgModule } from '@angular/core'

import { LocalStorageRepoServiceFactory } from '@core/localstorage-repo.service'
import { NotificationService } from '@core/notification.service'

@NgModule({
  providers: [LocalStorageRepoServiceFactory, NotificationService],
})
export class CoreModule {}
