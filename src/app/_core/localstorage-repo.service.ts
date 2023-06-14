import { Injectable } from '@angular/core'
import { attempt, isError, max } from 'lodash'
import { Observable, tap } from 'rxjs'

import { BaseRepoService, Entity } from '@core/base-repo.service'

export class LocalStorageRepoService<T extends Entity> extends BaseRepoService<T> {
  private localStorage: Storage
  private collectionName!: string

  constructor() {
    super()
    this.localStorage = window.localStorage
  }

  init(collectionName: string): void {
    this.collectionName = collectionName
    this.load()
  }

  private load(): void {
    const entityStr = this.localStorage.getItem(this.collectionName)
    if (entityStr) {
      const parseResult = attempt(JSON.parse.bind(null, entityStr)) as Error | T[]
      this.entities = isError(parseResult) ? [] : parseResult
      const entityIds = (this.entities ?? []).map(entity => entity.id)
      const nextId = max(entityIds)
      this.nextId = nextId ?? 1
    }
  }

  private save(): void {
    const entityStr = JSON.stringify(this.entities)
    this.localStorage.setItem(this.collectionName, entityStr)
  }

  override create(entityData: T): Observable<T> {
    return super.create(entityData).pipe(tap(() => this.save()))
  }

  override update(entityData: T): Observable<T> {
    return super.update(entityData).pipe(tap(() => this.save()))
  }

  override delete(id: number): Observable<boolean> {
    return super.delete(id).pipe(tap(() => this.save()))
  }
}

@Injectable()
export class LocalStorageRepoServiceFactory {
  getInstance<T extends Entity>(): LocalStorageRepoService<T> {
    return new LocalStorageRepoService<T>()
  }
}
