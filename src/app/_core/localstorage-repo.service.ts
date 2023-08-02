import { Injectable } from '@angular/core'
import { attempt, cloneDeep, isError, max, remove } from 'lodash'
import { Observable, of } from 'rxjs'

import { Entity } from '@core/entity'

export class LocalStorageRepoService<T extends Entity> {
  private localStorage: Storage = window.localStorage
  private entities: T[] = []
  private nextId = 0

  constructor(private collectionName: string) {}

  init(): void {
    this.load()
  }

  getOne(id: number): Observable<T> {
    const entity = this.entities.find(entity => entity.id === id)!
    const entityClone = cloneDeep(entity)
    return of(entityClone)
  }

  getList(): Observable<T[]> {
    return of(cloneDeep(this.entities))
  }

  create(entityData: T): Observable<T> {
    entityData.id = ++this.nextId
    this.entities.push(cloneDeep(entityData))
    this.save()
    return of(entityData)
  }

  update(entityData: T): Observable<T> {
    const entity = this.entities.find(entity => entity.id === entityData.id)!
    Object.assign(entity, entityData)
    this.save()
    return of(entityData)
  }

  delete(id: number): Observable<boolean> {
    const result = remove(this.entities, entity => entity.id === id)
    this.save()
    return of(!!result)
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
}

@Injectable()
export class LocalStorageRepoServiceFactory {
  createInstance<T extends Entity>(collectionName: string): LocalStorageRepoService<T> {
    return new LocalStorageRepoService<T>(collectionName)
  }
}
