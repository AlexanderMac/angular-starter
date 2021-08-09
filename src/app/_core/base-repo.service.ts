import * as _ from 'lodash'
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

  getOne(id: any): Observable<any> {
    let obj = _.chain(this._objects)
      .find({ id: parseInt(id) })
      .cloneDeep()
      .value()
    return of(obj)
  }

  getList(): Observable<any[]> {
    return of(_.cloneDeep(this._objects))
  }

  create(obj: any): Observable<any> {
    obj.id = ++this._nextId
    this._objects.push(_.cloneDeep(obj))
    return of(obj)
  }

  update(objData: any): Observable<any> {
    let obj = _.find(this._objects, { id: parseInt(objData.id) })
    _.extend(obj, objData)
    return of(_.cloneDeep(obj))
  }

  delete(id: any): Observable<boolean> {
    let result = _.remove(this._objects, obj => obj.id === parseInt(id))
    return of(!!result)
  }
}
