System.register(['angular2/core', 'angular2/router', '../modal/modal.component', '../common/services/data.service', '@ngrx/store', '../common/models/enum'], function(exports_1, context_1) {
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
    var core_1, router_1, modal_component_1, data_service_1, store_1, enum_1;
    var DetailPanelComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (modal_component_1_1) {
                modal_component_1 = modal_component_1_1;
            },
            function (data_service_1_1) {
                data_service_1 = data_service_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (enum_1_1) {
                enum_1 = enum_1_1;
            }],
        execute: function() {
            DetailPanelComponent = (function () {
                function DetailPanelComponent(_routeParams, _dataService, _store, _dcl, _elementRef) {
                    this._routeParams = _routeParams;
                    this._dataService = _dataService;
                    this._store = _store;
                    this._dcl = _dcl;
                    this._elementRef = _elementRef;
                    this.isDisableFieldForNext = false;
                    //outputs
                    this.selectElement = new core_1.EventEmitter();
                    this.refreshRowData = new core_1.EventEmitter();
                }
                DetailPanelComponent.prototype.ngOnInit = function () {
                    this._owner = this._routeParams.get('_owner');
                    this.state = 'view';
                };
                DetailPanelComponent.prototype.ngAfterContentInit = function () {
                    var _this = this;
                    if (this._owner) {
                        this._selectedElements = this._store.select('selectedElements');
                        this._selectedElements.subscribe(function (selectedElements) { return _this._selectedElementValue = selectedElements[_this._owner]; });
                    }
                };
                //save panel state (on open modal)
                DetailPanelComponent.prototype.savePanel = function (data) {
                    this._store.dispatch({ type: 'SELECT_ELEMENT', payload: { data: data, owner: this._owner } });
                };
                DetailPanelComponent.prototype.onSubmit = function (value) {
                    var _this = this;
                    if (this.state === 'view') {
                        console.log(value);
                        this._dataService.add(this._owner, value)
                            .then(function (res) {
                            _this.selectElement.emit(value);
                            return res;
                        }, function (err) {
                            console.log(err);
                            return err;
                        });
                    }
                    if (this.state === 'edit') {
                        this._dataService.edit(this._owner, this._selectedElementValue, value)
                            .then(function (res) {
                            _this.selectElement.emit(value);
                            //if edit in modal update its children grids
                            if (_this._caller) {
                                enum_1._children[_this._owner].forEach(function (child) { return _this._dataService.getRowData(_this._caller).take(1).subscribe(function (data) { return data; }); });
                            }
                            ;
                            return res;
                        }, function (err) {
                            console.log(err);
                            return err;
                        });
                    }
                };
                DetailPanelComponent.prototype.modalShow = function (modalOwner) {
                    var _this = this;
                    this._dcl.loadNextToLocation(modal_component_1.MyModalComponent, this._elementRef).then(function (ref) {
                        setTimeout(function () {
                            ref.instance.myDispose = function () {
                                ref.dispose();
                            };
                            ref.instance.sectedElementFromCaller = _this._selectedElementValue;
                            ref.instance.selectElement = _this.selectElement;
                            ref.instance.showModal(modalOwner, _this._owner);
                        }, 0);
                    });
                };
                DetailPanelComponent.prototype.selectionFromModal = function (owner, value) {
                    this._store.dispatch({ type: 'SET_CHILD_VALUE', payload: { data: value[owner].id, childKey: owner, owner: this._owner } });
                };
                DetailPanelComponent.prototype.initModalPanel = function (modalOwner) {
                    this._owner = modalOwner;
                };
                DetailPanelComponent.prototype.initNextPanel = function (modalOwner) {
                    if (modalOwner === 'osnovna_valuta' || modalOwner === 'prema_valuti') {
                        modalOwner = 'kurs_u_valuti';
                    }
                    this._owner = modalOwner;
                    this.isDisableFieldForNext = true;
                };
                DetailPanelComponent.prototype.test = function () {
                };
                DetailPanelComponent = __decorate([
                    core_1.Component({
                        selector: 'my-detail-panel',
                        templateUrl: 'app/detail-panel/detail-panel.component.html',
                        inputs: ['state', 'isDisableFieldForNext'],
                        outputs: ['selectElement', 'refreshRowData']
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, data_service_1.DataService, store_1.Store, core_1.DynamicComponentLoader, core_1.ElementRef])
                ], DetailPanelComponent);
                return DetailPanelComponent;
            }());
            exports_1("DetailPanelComponent", DetailPanelComponent);
        }
    }
});
//# sourceMappingURL=detail-panel.component.js.map