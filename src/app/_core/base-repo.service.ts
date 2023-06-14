import { chain, cloneDeep, extend, find, remove } from 'lodash'
import { Observable, of } from 'rxjs'

type Entity = {
  id: any
}

export class BaseRepoService {
  protected _objects: Entity[]
  protected _nextId: number

  constructor() {
    this._objects = []
    this._nextId = 0
  }

  getOne(id: any): Observable<any> {
    const obj = chain(this._objects)
      .find({ id: parseInt(id) })
      .cloneDeep()
      .value()
    return of(obj)
  }

  getList(): Observable<any[]> {
    return of(cloneDeep(this._objects))
  }

  create(obj: any): Observable<any> {
    obj.id = ++this._nextId
    this._objects.push(cloneDeep(obj))
    return of(obj)
  }

  update(objData: any): Observable<any> {
    const obj = find(this._objects, { id: parseInt(objData.id) })
    extend(obj, objData)
    return of(cloneDeep(obj))
  }

  delete(id: any): Observable<boolean> {
    const result = remove(this._objects, obj => obj.id === parseInt(id))
    return of(!!result)
  }
}
