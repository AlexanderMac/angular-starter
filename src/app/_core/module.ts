import { NgModule }                from '@angular/core';
import { MemoryRepoService }       from './memory-repo.service';
import { LocalStorageRepoService } from './localstorage-repo.service';
import { NotificationService }     from './notification.service';

@NgModule({
  providers: [
    MemoryRepoService,
    LocalStorageRepoService,
    NotificationService
  ]
})
export class CoreModule { }
