import { Observable } from 'rxjs/Observable';
import { of }         from 'rxjs/observable/of';
import * as _         from 'lodash';

interface IObject {
  id: any;
}

export class BaseRepoService {
  protected objects: IObject[];
  protected nextId: number;

  constructor() {
    this.objects = [];
    this.nextId = 0;
  }

  getOne(id: any): Observable<any> {
    let obj = _.chain(this.objects)
      .find({ id: parseInt(id) })
      .cloneDeep()
      .value();
    return of(obj);
  }

  getList(): Observable<any[]> {
    return of(_.cloneDeep(this.objects));
  }

  create(obj: any): Observable<any> {
    obj.id = ++this.nextId;
    this.objects.push(_.cloneDeep(obj));
    return of(obj);
  }

  update(objData: any): Observable<any> {
    let obj = _.find(this.objects, { id: parseInt(objData.id) });
    _.extend(obj, objData);
    return of(_.cloneDeep(obj));
  }

  delete(id: any): Observable<boolean> {
    let result = _.remove(this.objects, obj => obj.id === parseInt(id));
    return of(!!result);
  }
}
