System.register(['angular2/core', 'angular2/http', 'rxjs/Observable', '@ngrx/store'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, Observable_1, store_1;
    var DataService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            }],
        execute: function() {
            DataService = (function () {
                function DataService(http, _store) {
                    this.http = http;
                    this._store = _store;
                    this._baseUrl = 'http://localhost:3000/'; // URL to web api
                }
                DataService.prototype.getRowData = function (_owner) {
                    var _this = this;
                    if (_owner) {
                        return this.http.get(this._baseUrl + _owner)
                            .map(function (res) {
                            _this._store.dispatch({ type: 'SET_ROW_DATA', payload: { data: res.json().data, owner: _owner } });
                            console.log(res.json().data);
                            return res.json().data;
                        })
                            .catch(this.handleError);
                    }
                };
                DataService.prototype.formatDate = function (date) {
                    var yyyy = date.getFullYear().toString();
                    var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
                    var dd = date.getDate().toString();
                    return yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]);
                };
                DataService.prototype.handleError = function (error) {
                    console.log('ERROR !');
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                DataService.prototype.get = function (_owner) {
                    return this.http.get(this._baseUrl + _owner)
                        .map(function (res) {
                        console.log(res.json().data);
                        return res.json().data;
                    })
                        .catch(this.handleError);
                };
                //adding to database and grid model
                DataService.prototype.add = function (_owner, data) {
                    var _this = this;
                    var body = JSON.stringify(data);
                    var head = new http_1.Headers();
                    head.append('Content-Type', 'application/json');
                    return this.http.post(this._baseUrl + _owner, body, { headers: head }).toPromise().then(function (res) {
                        var addedRow = res.json().data[0];
                        if (addedRow.length > 1) {
                            addedRow.forEach(function (el) {
                                _this._store.dispatch({ type: 'ADD_ROW', payload: { data: el, owner: _owner } });
                            });
                            return addedRow[0];
                        }
                        if (addedRow[0])
                            addedRow = addedRow[0];
                        if (_owner === "rtgs")
                            return addedRow;
                        console.log(addedRow);
                        _this._store.dispatch({ type: 'ADD_ROW', payload: { data: addedRow, owner: _owner } });
                        return addedRow;
                    }, function (err) { return err; });
                };
                //deleting from database and grid model
                DataService.prototype.delete = function (_owner, data) {
                    var _this = this;
                    var body = JSON.stringify(data);
                    var head = new http_1.Headers();
                    head.append('Content-Type', 'application/json');
                    return this.http.delete(this._baseUrl + _owner, { body: body, headers: head }).toPromise().then(function (res) {
                        _this._store.dispatch({ type: 'DELETE_ROW', payload: { data: data, owner: _owner } });
                        return res;
                    }, function (err) { return err; });
                };
                //Updating database and grid model
                DataService.prototype.edit = function (_owner, oldData, newData) {
                    var _this = this;
                    var bodyObj = new Object();
                    for (var key in newData) {
                        bodyObj[key] = newData[key];
                    }
                    for (var key in oldData) {
                        bodyObj['old' + key] = oldData[key];
                    }
                    var body = JSON.stringify(bodyObj);
                    var head = new http_1.Headers();
                    head.append('Content-Type', 'application/json');
                    return this.http.patch(this._baseUrl + _owner, body, { headers: head }).toPromise().then(function (res) {
                        console.log(res.json().data[0]);
                        var editedRow = res.json().data[0];
                        for (var key in oldData) {
                            delete editedRow['old' + key];
                        }
                        _this._store.dispatch({ type: 'UPDATE_ROW', payload: { oldData: oldData, newData: editedRow, owner: _owner } });
                        return newData;
                    }, function (err) { return err; });
                };
                DataService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, store_1.Store])
                ], DataService);
                return DataService;
            }());
            exports_1("DataService", DataService);
        }
    }
});
//# sourceMappingURL=data.service.js.map