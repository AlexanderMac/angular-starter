import * as _ from 'lodash'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { BaseRepoService } from './base-repo.service'

export class LocalStorageRepoService extends BaseRepoService {
  private _localStorage: Storage
  private _collectionName: string

  constructor() {
    super()
    this._localStorage = window.localStorage
  }

  init(collectionName: string): void {
    this._collectionName = collectionName
    this.load()
  }

  load(): void {
    let objsStr = this._localStorage.getItem(this._collectionName)
    if (objsStr) {
      let parseResult = _.attempt(JSON.parse.bind(null, objsStr)) as any[]
      this._objects = _.isError(parseResult) ? [] : parseResult
      let nextIdStr = _.chain(this._objects)
        .map('id')
        .max()
        .value()
      this._nextId = +nextIdStr || 0
    }
  }

  save(): void {
    let objsStr = JSON.stringify(this._objects)
    this._localStorage.setItem(this._collectionName, objsStr)
  }

  create(obj: any): Observable<any> {
    let obs = super.create(obj)
    obs.subscribe(() => this.save())
    return obs
  }

  update(objData: any): Observable<any> {
    let obs = super.update(objData)
    obs.subscribe(() => this.save())
    return obs
  }

  delete(id: any): Observable<boolean> {
    let obs = super.delete(id)
    obs.subscribe(() => this.save())
    return obs
  }
}

@Injectable()
export class LocalStorageRepoServiceFactory {
  getInstance(): LocalStorageRepoService {
    let instance = new LocalStorageRepoService()
    return instance
  }
}
