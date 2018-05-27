import { Injectable }        from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { of }                from 'rxjs/observable/of';
import * as _                from 'lodash';
import { MemoryRepoService } from './memory-repo.service';

@Injectable()
export class LocalStorageRepoService extends MemoryRepoService {
  private localStorage: Storage;
  private collectionName: string;

  constructor(window: Window) {
    super();
    this.localStorage = window.localStorage;
  }

  init(collectionName: string) {
    this.collectionName = collectionName;
    this.load();
  }

  load(): void {
    let modelsStr = this.localStorage.getItem(this.collectionName);
    if (modelsStr) {
      let models = _.attempt(JSON.parse.bind(null, modelsStr)) as any[];
      this.models = _.isError(models) ? [] : models;
      let nextIdStr = _.chain(this.models)
        .map('id')
        .max()
        .value();
      this.nextId = +nextIdStr || 0;
    }
  }

  save(): void {
    let modelsStr = JSON.stringify(this.models);
    this.localStorage.setItem(this.collectionName, modelsStr);
  }

  create(model: any): Observable<any> {
    let createdModel = super.create(model);
    this.save();
    return of(createdModel);
  }

  update(modelData: any): Observable<any> {
    let updatedModel = super.update(modelData);
    this.save();
    return of(updatedModel);
  }

  delete(id: any): Observable<boolean> {
    let result = super.delete(id);
    this.save();
    return of(!!result);
  }
}
