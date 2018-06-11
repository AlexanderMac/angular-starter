import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of }         from 'rxjs/observable/of';
import * as _         from 'lodash';

interface IModel {
  id: any;
}

export class MemoryRepoService {
  protected models: IModel[];
  protected nextId: number;

  constructor() {
    this.models = [];
    this.nextId = 0;
  }

  getOne(id: any): Observable<any> {
    let model = _.chain(this.models)
      .find({ id: parseInt(id) })
      .cloneDeep()
      .value();
    return of(model);
  }

  getList(): Observable<any[]> {
    return of(_.cloneDeep(this.models));
  }

  create(model: any): Observable<any> {
    model.id = ++this.nextId;
    this.models.push(_.cloneDeep(model));
    return of(model);
  }

  update(modelData: any): Observable<any> {
    let model = _.find(this.models, { id: parseInt(modelData.id) });
    _.extend(model, modelData);
    return of(_.cloneDeep(model));
  }

  delete(id: any): Observable<boolean> {
    let result = _.remove(this.models, model => model.id === parseInt(id));
    return of(!!result);
  }
}

@Injectable()
export class MemoryRepoServiceFactory {
  getInstance() {
    let instance = new MemoryRepoService();
    return instance;
  }
}
