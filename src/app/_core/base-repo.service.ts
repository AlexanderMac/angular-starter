import { cloneDeep, extend, find, chain, remove } from 'lodash'
import { Observable, of } from 'rxjs'

interface IObject {
  id: any;
}

export class BaseRepoService {
  protected _objects: IObject[]
  protected _nextId: number

  constructor() {
    this._objects = []
    this._nextId = 0
  }

  getOne( id: any): Observable<any> {
    let obj = chain(this._objects)
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
    let obj = find(this._objects, { id: parseInt(objData.id) })
    extend(obj, objData)
    return of(cloneDeep(obj))
  }

  delete(id: any): Observable<boolean> {
    let result = remove(this._objects, obj => obj.id === parseInt(id))
    return of(!!result)
  }
}
