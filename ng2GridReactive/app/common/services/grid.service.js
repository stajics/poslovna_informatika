System.register(['angular2/core', '@ngrx/store'], function(exports_1, context_1) {
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
    var core_1, store_1;
    var GridService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            }],
        execute: function() {
            GridService = (function () {
                function GridService(_store) {
                    this._store = _store;
                }
                GridService.prototype.selectNext = function (gridApi) {
                    //Select first node if none selected
                    if (gridApi.getSelectedNodes().length === 0) {
                        gridApi.getModel().getRow(0).setSelected(true, true);
                        return;
                    }
                    var rowIndex = gridApi.getSelectedNodes()[0].childIndex;
                    var rowCount = gridApi.getModel().getRowCount();
                    if (rowCount > rowIndex + 1) {
                        gridApi.getModel().getRow(rowIndex + 1).setSelected(true, true);
                    }
                };
                GridService.prototype.selectPrevious = function (gridApi) {
                    //Select first node if none selected
                    if (gridApi.getSelectedNodes().length === 0) {
                        gridApi.getModel().getRow(0).setSelected(true, true);
                        return;
                    }
                    var rowIndex = gridApi.getSelectedNodes()[0].childIndex;
                    if (-1 < rowIndex - 1) {
                        gridApi.getModel().getRow(rowIndex - 1).setSelected(true, true);
                    }
                };
                //select given JSON element
                GridService.prototype.selectElement = function (gridApi, json) {
                    gridApi.getModel().forEachNode(function (rowNode) {
                        for (var key in json) {
                            if (rowNode.data[key].toString() !== json[key].toString()) {
                                return;
                            }
                        }
                        rowNode.setSelected(true, true);
                    });
                };
                //Set selected element in store
                GridService.prototype.updateSelected = function (gridApi, _owner) {
                    this._store.dispatch({ type: 'SELECT_ELEMENT', payload: { data: gridApi.getSelectedRows()[0], owner: _owner } });
                };
                GridService.prototype.refreshView = function (gridApi) {
                    gridApi.refreshView();
                };
                GridService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [store_1.Store])
                ], GridService);
                return GridService;
            }());
            exports_1("GridService", GridService);
        }
    }
});
//# sourceMappingURL=grid.service.js.map