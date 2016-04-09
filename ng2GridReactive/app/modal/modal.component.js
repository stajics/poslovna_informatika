System.register(['angular2/core', 'ng2-bs3-modal/ng2-bs3-modal', '../ag-grid/ag-grid.component', '../detail-panel/detail-panel.component', '@ngrx/store', '../common/models/enum'], function(exports_1, context_1) {
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
    var core_1, ng2_bs3_modal_1, ag_grid_component_1, detail_panel_component_1, store_1, enum_1;
    var MyModalComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_bs3_modal_1_1) {
                ng2_bs3_modal_1 = ng2_bs3_modal_1_1;
            },
            function (ag_grid_component_1_1) {
                ag_grid_component_1 = ag_grid_component_1_1;
            },
            function (detail_panel_component_1_1) {
                detail_panel_component_1 = detail_panel_component_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (enum_1_1) {
                enum_1 = enum_1_1;
            }],
        execute: function() {
            MyModalComponent = (function () {
                function MyModalComponent(_store) {
                    this._store = _store;
                }
                //caller - modal parent, modalOwner - modal owner (caller: mesto -> modalOwner: drzva)
                MyModalComponent.prototype.showModal = function (modalOwner, caller) {
                    this._childKey = modalOwner;
                    if (modalOwner === 'osnovna_valuta') {
                        modalOwner = 'valute';
                        this._childKey = 'osnovna_valuta';
                    }
                    if (modalOwner === 'prema_valuti') {
                        modalOwner = 'valute';
                        this._childKey = 'prema_valuti';
                    }
                    this._modalOwner = modalOwner;
                    this._caller = caller;
                    this.grid.initModalGrid(modalOwner);
                    this.panel.initModalPanel(modalOwner);
                    this.panel._caller = caller;
                    this.modal.open();
                };
                MyModalComponent.prototype.setValueFromModal = function () {
                    var _this = this;
                    if (this.sectedElementFromCaller[Object.keys(this.sectedElementFromCaller)[0]] !== null) {
                        this.selectElement.emit(this.sectedElementFromCaller);
                    }
                    setTimeout(function () {
                        _this._store.select('selectedElements').take(1)
                            .subscribe(function (selectedElements) {
                            _this._valueFromModal = selectedElements[_this._modalOwner][enum_1._ids[_this._modalOwner]];
                            _this._store.dispatch({ type: 'SET_CHILD_VALUE', payload: { data: _this._valueFromModal, childKey: _this._childKey, owner: _this._caller } });
                        });
                        _this.closeModal();
                    }, 100);
                };
                MyModalComponent.prototype.cancel = function () {
                    if (this.sectedElementFromCaller[Object.keys(this.sectedElementFromCaller)[0]] !== null) {
                        this.selectElement.emit(this.sectedElementFromCaller);
                    }
                    this.closeModal();
                };
                MyModalComponent.prototype.closeModal = function () {
                    this.myDispose();
                };
                __decorate([
                    core_1.ViewChild('modal'), 
                    __metadata('design:type', Object)
                ], MyModalComponent.prototype, "modal", void 0);
                __decorate([
                    core_1.ViewChild('grid'), 
                    __metadata('design:type', Object)
                ], MyModalComponent.prototype, "grid", void 0);
                __decorate([
                    core_1.ViewChild('panel'), 
                    __metadata('design:type', Object)
                ], MyModalComponent.prototype, "panel", void 0);
                MyModalComponent = __decorate([
                    core_1.Component({
                        selector: 'my-modal',
                        templateUrl: 'app/modal/modal.component.html',
                        directives: [core_1.forwardRef(function () { return ag_grid_component_1.AgGridComponent; }), core_1.forwardRef(function () { return detail_panel_component_1.DetailPanelComponent; }), ng2_bs3_modal_1.MODAL_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [store_1.Store])
                ], MyModalComponent);
                return MyModalComponent;
            }());
            exports_1("MyModalComponent", MyModalComponent);
        }
    }
});
//# sourceMappingURL=modal.component.js.map