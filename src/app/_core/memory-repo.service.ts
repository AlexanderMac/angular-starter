import { Injectable }      from '@angular/core';
import { BaseRepoService } from './base-repo.service';

export class MemoryRepoService extends BaseRepoService {}

@Injectable()
export class MemoryRepoServiceFactory {
  getInstance() {
    let instance = new MemoryRepoService();
    return instance;
  }
}
