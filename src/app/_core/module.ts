import { NgModule } from '@angular/core'
import { MemoryRepoServiceFactory } from './memory-repo.service'
import { LocalStorageRepoServiceFactory } from './localstorage-repo.service'
import { NotificationService } from './notification.service'

@NgModule({
  providers: [
    MemoryRepoServiceFactory,
    LocalStorageRepoServiceFactory,
    NotificationService
  ]
})
export class CoreModule { }
