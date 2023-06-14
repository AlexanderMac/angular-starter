import { Injectable } from '@angular/core'
import { attempt, chain, isError } from 'lodash'
import { Observable } from 'rxjs'

import { BaseRepoService } from '@core/base-repo.service'

export class LocalStorageRepoService extends BaseRepoService {
  private _localStorage: Storage
  private _collectionName!: string

  constructor() {
    super()
    this._localStorage = window.localStorage
  }

  init(collectionName: string): void {
    this._collectionName = collectionName
    this.load()
  }

  load(): void {
    const objsStr = this._localStorage.getItem(this._collectionName)
    if (objsStr) {
      const parseResult = attempt(JSON.parse.bind(null, objsStr)) as any[]
      this._objects = isError(parseResult) ? [] : parseResult
      const nextIdStr = chain(this._objects).map('id').max().value()
      this._nextId = +nextIdStr || 0
    }
  }

  save(): void {
    const objsStr = JSON.stringify(this._objects)
    this._localStorage.setItem(this._collectionName, objsStr)
  }

  override create(obj: any): Observable<any> {
    const obs = super.create(obj)
    obs.subscribe(() => this.save())
    return obs
  }

  override update(objData: any): Observable<any> {
    const obs = super.update(objData)
    obs.subscribe(() => this.save())
    return obs
  }

  override delete(id: any): Observable<boolean> {
    const obs = super.delete(id)
    obs.subscribe(() => this.save())
    return obs
  }
}

@Injectable()
export class LocalStorageRepoServiceFactory {
  getInstance(): LocalStorageRepoService {
    const instance = new LocalStorageRepoService()
    return instance
  }
}
