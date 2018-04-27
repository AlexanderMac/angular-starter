import { NgModule }            from '@angular/core';
import { MemoryRepoService }   from './memory-repo.service';
import { NotificationService } from './notification.service';

@NgModule({
  providers: [
    MemoryRepoService,
    NotificationService
  ]
})
export class CoreModule { }
