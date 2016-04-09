import {Injectable} from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {Drzava} from '../models/drzava';

import {Store} from '@ngrx/store';
import {AppState} from '../common/redux/appState';


@Injectable()
export class DataService {

  rowData;

  constructor(private http: Http, private _store: Store<AppState>) {
  }


  private _baseUrl = 'http://localhost:3000/';  // URL to web api

  getRowData(_owner) {
    if (_owner) {
      return this.http.get(this._baseUrl + _owner)
        .map(res => {
        this._store.dispatch({ type: 'SET_ROW_DATA', payload: { data: res.json().data, owner: _owner } });
        console.log(res.json().data)
        return res.json().data;
      })
        .catch(this.handleError);
    }
  }

  formatDate(date) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = date.getDate().toString();
    return yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]);
  }

  private handleError(error: Response) {
    console.log('ERROR !')
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
  
  get(_owner){
    return this.http.get(this._baseUrl + _owner)
      .map(res => {
      console.log(res.json().data)
      return res.json().data;
    })
      .catch(this.handleError);
  }

  //adding to database and grid model
  add(_owner, data) {
    let body = JSON.stringify(data);
    let head = new Headers();
    head.append('Content-Type', 'application/json');
    return this.http.post(this._baseUrl + _owner, body, { headers: head }).toPromise().then(
      res => {
        var addedRow = res.json().data[0];
        if(addedRow.length > 1){
          addedRow.forEach(el=>{
            this._store.dispatch({ type: 'ADD_ROW', payload: { data: el, owner: _owner } });
          })
          return addedRow[0];
        }
        if(addedRow[0]) addedRow = addedRow[0];
        if(_owner === "rtgs") return addedRow;
        console.log(addedRow);
        this._store.dispatch({ type: 'ADD_ROW', payload: { data: addedRow, owner: _owner } });
        return addedRow;
      },
      err => err);
  }

  //deleting from database and grid model
  delete(_owner, data) {
    let body = JSON.stringify(data);
    let head = new Headers();
    head.append('Content-Type', 'application/json');
    return this.http.delete(this._baseUrl + _owner, { body: body, headers: head }).toPromise().then(
      res => {
        this._store.dispatch({ type: 'DELETE_ROW', payload: { data: data, owner: _owner } });
        return res;
      },
      err => err);
  }

  //Updating database and grid model
  edit(_owner, oldData, newData) {
    let bodyObj = new Object();
    for (let key in newData) {
      bodyObj[key] = newData[key];
    }
    for (let key in oldData) {
      bodyObj['old' + key] = oldData[key];
    }
    let body = JSON.stringify(bodyObj);
    let head = new Headers();
    head.append('Content-Type', 'application/json');
    return this.http.patch(this._baseUrl + _owner, body, { headers: head }).toPromise().then(
      res => {
        console.log(res.json().data[0])
        var editedRow = res.json().data[0];
        for (let key in oldData) {
          delete editedRow['old' + key];
        }
        this._store.dispatch({ type: 'UPDATE_ROW', payload: { oldData: oldData, newData: editedRow, owner: _owner } });
        return newData;
      },
      err => err);

  }
}
