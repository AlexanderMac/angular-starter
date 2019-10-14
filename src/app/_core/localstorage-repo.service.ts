import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { BaseRepoService } from './base-repo.service';

export class LocalStorageRepoService extends BaseRepoService {
  private localStorage: Storage;
  private collectionName: string;

  constructor() {
    super();
    this.localStorage = window.localStorage;
  }

  init(collectionName: string): void {
    this.collectionName = collectionName;
    this.load();
  }

  load(): void {
    let objsStr = this.localStorage.getItem(this.collectionName);
    if (objsStr) {
      let parseResult = _.attempt(JSON.parse.bind(null, objsStr)) as any[];
      this.objects = _.isError(parseResult) ? [] : parseResult;
      let nextIdStr = _.chain(this.objects)
        .map('id')
        .max()
        .value();
      this.nextId = +nextIdStr || 0;
    }
  }

  save(): void {
    let objsStr = JSON.stringify(this.objects);
    this.localStorage.setItem(this.collectionName, objsStr);
  }

  create(obj: any): Observable<any> {
    let obs = super.create(obj);
    obs.subscribe(() => this.save());
    return obs;
  }

  update(objData: any): Observable<any> {
    let obs = super.update(objData);
    obs.subscribe(() => this.save());
    return obs;
  }

  delete(id: any): Observable<boolean> {
    let obs = super.delete(id);
    obs.subscribe(() => this.save());
    return obs;
  }
}

@Injectable()
export class LocalStorageRepoServiceFactory {
  getInstance(): LocalStorageRepoService {
    let instance = new LocalStorageRepoService();
    return instance;
  }
}
