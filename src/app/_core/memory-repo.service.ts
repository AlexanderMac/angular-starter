import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of }         from 'rxjs/observable/of';
import * as _         from 'lodash';

@Injectable()
export class MemoryRepoService {
  protected models: any[];
  protected nextId: number;

  constructor() {
    this.models = [];
    this.nextId = 0;
  }

  getOne(id: number): Observable<any> {
    let model = _.find(this.models, { id });
    return of(model);
  }

  getList(): Observable<any[]> {
    return of(this.models);
  }

  create(model: any): Observable<any> {
    model.id = ++this.nextId;
    this.models.push(model);
    return of(model);
  }

  update(modelData: any): Observable<any> {
    let model = _.find(this.models, { id: modelData.id });
    _.extend(model, modelData);
    return of(model);
  }

  delete(id: any): Observable<boolean> {
    let result = _.remove(this.models, { id });
    return of(!!result);
  }
}
