import { cloneDeep, remove } from 'lodash'
import { Observable, of } from 'rxjs'

export type Entity = {
  id: number
}

export class BaseRepoService<T extends Entity> {
  protected entities: T[]
  protected nextId: number

  constructor() {
    this.entities = []
    this.nextId = 0
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
    return of(entityData)
  }

  update(entityData: T): Observable<T> {
    const entity = this.entities.find(entity => entity.id === entityData.id)!
    Object.assign(entity, entityData)
    return of(cloneDeep(entity))
  }

  delete(id: number): Observable<boolean> {
    const result = remove(this.entities, entity => entity.id === id)
    return of(!!result)
  }
}
